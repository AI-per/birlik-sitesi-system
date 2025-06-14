import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

// GET /api/users/[id] - Tek kullanıcı detayı
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: {
        apartment: {
          include: {
            block: true,
            dues: {
              include: {
                payment: true,
              },
              orderBy: {
                dueDate: 'desc',
              },
            },
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

    const userWithDetails = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString().split('T')[0],
      apartment: user.apartment ? {
        id: user.apartment.id,
        number: user.apartment.number,
        floor: user.apartment.floor,
        type: user.apartment.type,
        squareMeters: user.apartment.squareMeters,
        blockName: user.apartment.block.name,
      } : null,
      dues: user.apartment?.dues?.map((due: any) => ({
        id: due.id,
        amount: Number(due.amount),
        dueDate: due.dueDate.toISOString().split('T')[0],
        month: due.month,
        year: due.year,
        description: due.description,
        isPaid: !!due.payment,
        paymentDate: due.payment?.paymentDate?.toISOString().split('T')[0] || null,
      })) || [],
    };

    return NextResponse.json(userWithDetails);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Kullanıcı yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Kullanıcı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { fullName, email, phone, role, apartmentId, isActive, password } = body;

    // Mevcut kullanıcı var mı kontrol et
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Validasyon
    if (!fullName || !email || !role) {
      return NextResponse.json(
        { error: "Ad soyad, e-posta ve rol bilgisi gereklidir" },
        { status: 400 }
      );
    }

    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi giriniz" },
        { status: 400 }
      );
    }

    // Rol kontrolü
    const validRoles = ['RESIDENT', 'MANAGER', 'ADMIN'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Geçersiz rol seçimi" },
        { status: 400 }
      );
    }

    // E-posta benzersizlik kontrolü (kendi e-postası hariç)
    if (email !== existingUser.email) {
      const emailExists = await db.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Bu e-posta adresi zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    // Daire kontrolü (eğer belirtilmişse)
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
    }

    // Güncelleme verisi hazırla
    const updateData: any = {
      fullName,
      email,
      phone: phone || null,
      role,
      apartmentId: apartmentId || null,
      isActive: isActive !== undefined ? isActive : true,
    };

    // Şifre güncellemesi varsa hash'le
    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await db.user.update({
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

    return NextResponse.json({
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt.toISOString().split('T')[0],
      apartment: updatedUser.apartment ? {
        id: updatedUser.apartment.id,
        number: updatedUser.apartment.number,
        floor: updatedUser.apartment.floor,
        blockName: updatedUser.apartment.block.name,
      } : null,
      unpaidDuesCount: 0,
      totalUnpaidAmount: 0,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Kullanıcı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mevcut kullanıcı var mı kontrol et
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
      include: {
        apartment: {
          include: {
            dues: {
              include: {
                payment: true,
              },
            },
          },
        },
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Admin kullanıcı silinmesin
    if (existingUser.role === 'ADMIN') {
      return NextResponse.json(
        { error: "Admin kullanıcıları silinemez" },
        { status: 400 }
      );
    }

    // Ödenmemiş aidat var mı kontrol et
    const unpaidDues = existingUser.apartment?.dues?.filter((due: any) => !due.payment) || [];
    if (unpaidDues.length > 0) {
      return NextResponse.json(
        { error: "Bu kullanıcının ödenmemiş aidatları bulunduğu için silinemez." },
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