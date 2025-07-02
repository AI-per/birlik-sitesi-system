import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import bcrypt from "bcryptjs";

// GET /api/users - Tüm kullanıcıları listele
export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        apartment: {
          include: {
            block: true,
          },
        },
      },
      orderBy: {
        fullName: 'asc',
      },
    });

    const usersWithDetails = users.map((user: any) => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: formatDate(new Date(user.createdAt)),
      apartment: user.apartment ? {
        id: user.apartment.id,
        number: user.apartment.number,
        floor: user.apartment.floor,
        block: {
          id: user.apartment.block.id,
          name: user.apartment.block.name,
        },
      } : null,
    }));

    return NextResponse.json(usersWithDetails);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Kullanıcılar yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/users - Yeni kullanıcı oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, role, apartmentId } = body;

    // Gerekli alanları kontrol et
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, şifre ve tam ad gereklidir" },
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

    // Mevcut email kontrolü
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

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

      // Bu daireye başka resident atanmış mı kontrol et
      const existingResident = await db.user.findFirst({
        where: { 
          apartmentId: apartmentId,
          role: 'RESIDENT'
        },
      });

      if (existingResident) {
        return NextResponse.json(
          { error: "Bu dairede zaten bir sakin kayıtlı" },
          { status: 400 }
        );
      }
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone: phone || null,
        role: role || 'RESIDENT',
        apartmentId: apartmentId || null,
      },
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
      apartment: user.apartment ? {
        id: user.apartment.id,
        number: user.apartment.number,
        floor: user.apartment.floor,
        block: {
          id: user.apartment.block.id,
          name: user.apartment.block.name,
        },
      } : null,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 