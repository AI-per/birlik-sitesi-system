import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import bcrypt from "bcryptjs";

// GET /api/users/[id] - Kullanıcı detaylarını getir
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

    // Şifreyi response'tan çıkar
    const { password, ...userWithoutPassword } = user;

    const formattedUser = {
      ...userWithoutPassword,
      createdAt: formatDate(new Date(user.createdAt)),
      apartment: user.apartment ? {
        ...user.apartment,
        dues: user.apartment.dues.map((due: any) => ({
          ...due,
          dueDate: formatDate(new Date(due.dueDate)),
          paymentDate: due.payment?.paymentDate ? formatDate(new Date(due.payment.paymentDate)) : null,
        })),
      } : null,
    };

    return NextResponse.json(formattedUser);
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
    const { email, password, fullName, phone, role, apartmentId, isActive } = body;

    // Gerekli alanları kontrol et
    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Email ve tam ad gereklidir" },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi girin" },
        { status: 400 }
      );
    }

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

    // Email başka kullanıcıda kullanılıyor mu kontrol et
    const emailExists = await db.user.findFirst({
      where: { 
        email,
        NOT: {
          id: params.id
        }
      },
    });

    if (emailExists) {
      return NextResponse.json(
        { error: "Bu email adresi başka bir kullanıcı tarafından kullanılıyor" },
        { status: 400 }
      );
    }

    // Apartment ID varsa kontrol et
    if (apartmentId && apartmentId !== existingUser.apartmentId) {
      const apartment = await db.apartment.findUnique({
        where: { id: apartmentId },
      });

      if (!apartment) {
        return NextResponse.json(
          { error: "Seçilen daire bulunamadı" },
          { status: 400 }
        );
      }

      // Bu daireye başka resident atanmış mı kontrol et
      const existingResident = await db.user.findFirst({
        where: { 
          apartmentId: apartmentId,
          role: 'RESIDENT',
          NOT: {
            id: params.id
          }
        },
      });

      if (existingResident) {
        return NextResponse.json(
          { error: "Bu dairede zaten başka bir sakin kayıtlı" },
          { status: 400 }
        );
      }
    }

    // Update verilerini hazırla
    const updateData: any = {
      email,
      fullName,
      phone: phone || null,
      role: role || existingUser.role,
      apartmentId: apartmentId || null,
      isActive: isActive !== undefined ? isActive : existingUser.isActive,
    };

    // Şifre varsa hashle ve ekle
    if (password && password.trim() !== '') {
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

    // Şifreyi response'tan çıkar
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      ...userWithoutPassword,
      createdAt: formatDate(new Date(updatedUser.createdAt)),
      apartment: updatedUser.apartment ? {
        id: updatedUser.apartment.id,
        number: updatedUser.apartment.number,
        floor: updatedUser.apartment.floor,
        block: {
          id: updatedUser.apartment.block.id,
          name: updatedUser.apartment.block.name,
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

// DELETE /api/users/[id] - Kullanıcı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Kullanıcı başarıyla silindi",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Kullanıcı silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 