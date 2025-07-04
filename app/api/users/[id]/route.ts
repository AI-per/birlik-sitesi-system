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
        residingApartment: {
          include: {
            block: true,
          },
        },
        ownedApartment: {
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

    // Get the apartment (prioritize residing, fallback to owned)
    const apartment = user.residingApartment || user.ownedApartment;

    // Ödenmemiş aidatları getir (apartment varsa)
    const unpaidDues = apartment ? await db.due.findMany({
      where: {
        apartmentId: apartment.id,
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
      apartment: apartment ? {
        id: apartment.id,
        number: apartment.number,
        floor: apartment.floor,
        blockName: apartment.block.name,
        block: {
          id: apartment.block.id,
          name: apartment.block.name,
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
      // Remove the separate apartment fields from response
      residingApartment: undefined,
      ownedApartment: undefined,
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
    const { email, password, fullName, phone, role, isActive } = body;

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

    // Güncelleme verisini hazırla
    let updateData: any = {
      email: email?.trim() || null,
      fullName: fullName.trim(),
      phone: phone.trim(),
      role: role || 'RESIDENT',
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
        residingApartment: {
          include: {
            block: true,
          },
        },
        ownedApartment: {
          include: {
            block: true,
          },
        },
      },
    });

    // Şifreyi response'tan çıkar
    const { password: _, ...userWithoutPassword } = user;

    // Transform to match expected frontend format (use residing apartment, fallback to owned)
    const apartment = user.residingApartment || user.ownedApartment;

    return NextResponse.json({
      ...userWithoutPassword,
      createdAt: formatDate(new Date(user.createdAt)),
      detail_url: `/dashboard/users/${user.id}`,
      apartment: apartment ? {
        id: apartment.id,
        number: apartment.number,
        floor: apartment.floor,
        blockName: apartment.block.name,
        block: {
          id: apartment.block.id,
          name: apartment.block.name,
        },
      } : null,
      // Remove the separate apartment fields from response
      residingApartment: undefined,
      ownedApartment: undefined,
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