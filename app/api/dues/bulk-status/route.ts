import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PUT /api/dues/bulk-status - Toplu aidat durumu güncelleme
export async function PUT(request: NextRequest) {
  try {
    // Kullanıcı yetki kontrolü
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    // Sadece MANAGER ve ADMIN yetkilendirilmiş
    if (session.user.role !== 'MANAGER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Bu işlem için yeterli yetki yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { dueIds, status, payerId } = body;

    // Validasyon
    if (!dueIds || !Array.isArray(dueIds) || dueIds.length === 0) {
      return NextResponse.json(
        { error: "En az bir aidat seçilmelidir" },
        { status: 400 }
      );
    }

    if (!status || !['paid', 'unpaid'].includes(status)) {
      return NextResponse.json(
        { error: "Geçerli bir durum seçilmelidir (paid/unpaid)" },
        { status: 400 }
      );
    }

    // Ödeme yapılacaksa ödeyiciyi kontrol et
    if (status === 'paid' && !payerId) {
      return NextResponse.json(
        { error: "Ödeme yapan kullanıcı belirtilmelidir" },
        { status: 400 }
      );
    }

    // Seçilen aidatları kontrol et
    const dues = await db.due.findMany({
      where: {
        id: { in: dueIds }
      },
      include: {
        payment: true,
        apartment: {
          include: {
            block: true,
            resident: true,
            owner: true
          }
        }
      }
    });

    if (dues.length !== dueIds.length) {
      return NextResponse.json(
        { error: "Bazı aidatlar bulunamadı" },
        { status: 404 }
      );
    }

    const results = {
      updated: 0,
      skipped: 0,
      errors: [] as string[]
    };

    if (status === 'paid') {
      // Aidatları ödendi olarak işaretle
      for (const due of dues) {
        try {
          // Zaten ödenmiş aidatları atla
          if (due.payment) {
            results.skipped++;
            continue;
          }

          // Ödeme kaydı oluştur
          await db.payment.create({
            data: {
              dueId: due.id,
              payerId: payerId,
              amount: due.amount,
              paymentDate: new Date(),
              paymentMethod: 'Toplu İşlem',
              notes: 'Toplu ödeme işlemi ile oluşturuldu'
            }
          });

          results.updated++;
        } catch (error) {
          console.error(`Error updating due ${due.id}:`, error);
          results.errors.push(`${due.apartment.block.name} - ${due.apartment.number}: Güncelleme hatası`);
        }
      }
    } else {
      // Aidatları ödenmedi olarak işaretle  
      for (const due of dues) {
        try {
          // Zaten ödenmemiş aidatları atla
          if (!due.payment) {
            results.skipped++;
            continue;
          }

          // Ödeme kaydını sil
          await db.payment.delete({
            where: {
              dueId: due.id
            }
          });

          results.updated++;
        } catch (error) {
          console.error(`Error updating due ${due.id}:`, error);
          results.errors.push(`${due.apartment.block.name} - ${due.apartment.number}: Güncelleme hatası`);
        }
      }
    }

    return NextResponse.json({
      message: `${results.updated} aidat başarıyla güncellendi`,
      results
    });

  } catch (error) {
    console.error("Error in bulk status update:", error);
    return NextResponse.json(
      { error: "Toplu güncelleme sırasında hata oluştu" },
      { status: 500 }
    );
  }
}
