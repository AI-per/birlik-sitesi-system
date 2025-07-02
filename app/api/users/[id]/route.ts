import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import bcrypt from "bcryptjs";

// GET /api/users/[id] - Kullanıcı detayını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        apartment: {
          include: {
            block: true,
          },
        },
        payments: {
          include: {
            due: true,
          },
          orderBy: {
            paymentDate: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Ödenmemiş aidatları getir
    const unpaidDues = user.apartmentId ? await db.due.findMany({
      where: {
        apartmentId: user.apartmentId,
        payment: null, // Ödenmemiş olanlar
      },
      include: {
        apartment: {
          include: {
            block: true,
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    }) : [];

    const totalUnpaidAmount = unpaidDues.reduce((sum, due) => sum + Number(due.amount), 0);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      ...userWithoutPassword,
      createdAt: formatDate(new Date(user.createdAt)),
      apartment: user.apartment ? {
        id: user.apartment.id,
        number: user.apartment.number,
        floor: user.apartment.floor,
        blockName: user.apartment.block.name,
        block: {
          id: user.apartment.block.id,
          name: user.apartment.block.name,
        },
      } : null,
      dues: unpaidDues.map((due) => ({
        id: due.id,
        amount: Number(due.amount),
        month: due.month,
        year: due.year,
        dueDate: due.dueDate.toISOString(),
        description: due.description,
        paymentDate: null,
        isPaid: false,
      })),
      totalUnpaidAmount,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Kullanıcı yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Kullanıcıyı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, role, apartmentId, isActive } = body;

    // Gerekli alanları kontrol et
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Tam ad ve telefon numarası gereklidir" },
        { status: 400 }
      );
    }

    // Mevcut kullanıcıyı kontrol et
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Email varsa formatını ve benzersizliğini kontrol et
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "Geçerli bir email adresi girin" },
          { status: 400 }
        );
      }

      // Başka kullanıcı aynı email'i kullanıyor mu kontrol et
      const emailUser = await db.user.findUnique({
        where: { email: email.trim() },
      });

      if (emailUser && emailUser.id !== params.id) {
        return NextResponse.json(
          { error: "Bu email adresi zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    // Apartment ID varsa kontrol et
    if (apartmentId) {
      const apartment = await db.apartment.findUnique({
        where: { id: apartmentId },
      });

      if (!apartment) {
        return NextResponse.json(
          { error: "Seçilen daire bulunamadı" },
          { status: 400 }
        );
      }

      // Bu daireye başka resident atanmış mı kontrol et (kendisi hariç)
      const existingResident = await db.user.findFirst({
        where: { 
          apartmentId: apartmentId,
          role: 'RESIDENT',
          id: { not: params.id }
        },
      });

      if (existingResident) {
        return NextResponse.json(
          { error: "Bu dairede zaten bir sakin kayıtlı" },
          { status: 400 }
        );
      }
    }

    // Güncelleme verisini hazırla
    let updateData: any = {
      email: email?.trim() || null,
      fullName: fullName.trim(),
      phone: phone.trim(),
      role: role || 'RESIDENT',
      apartmentId: apartmentId || null,
      isActive: isActive !== undefined ? isActive : true,
    };

    // Şifre verilmişse hashle ve ekle
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password.trim(), 12);
      updateData.password = hashedPassword;
    }

    const user = await db.user.update({
      where: { id: params.id },
      data: updateData,
      include: {
        apartment: {
          include: {
            block: true,
          },
        },
      },
    });

    // Şifreyi response'tan çıkar
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      ...userWithoutPassword,
      createdAt: formatDate(new Date(user.createdAt)),
      detail_url: `/dashboard/users/${user.id}`,
      apartment: user.apartment ? {
        id: user.apartment.id,
        number: user.apartment.number,
        floor: user.apartment.floor,
        block: {
          id: user.apartment.block.id,
          name: user.apartment.block.name,
        },
      } : null,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Kullanıcıyı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Kullanıcıyı kontrol et
    const user = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Admin kullanıcıları silinemez
    if (user.role === 'ADMIN') {
      return NextResponse.json(
        { error: "Admin kullanıcıları silinemez" },
        { status: 400 }
      );
    }

    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Kullanıcı silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 