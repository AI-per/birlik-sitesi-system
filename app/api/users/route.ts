import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

// GET /api/users - Tüm kullanıcıları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const apartmentId = searchParams.get('apartmentId');

    let whereClause: any = {};
    
    if (role) {
      whereClause.role = role;
    }
    
    if (apartmentId) {
      whereClause.apartmentId = apartmentId;
    }

    const users = await db.user.findMany({
      where: whereClause,
      include: {
        apartment: {
          include: {
            block: true,
            dues: {
              where: {
                payment: null, // Ödenmemiş aidatlar
              },
              select: {
                id: true,
                amount: true,
                dueDate: true,
                month: true,
                year: true,
              },
            },
          },
        },
      },
      orderBy: [
        { fullName: 'asc' },
      ],
    });

    const usersWithDetails = users.map((user: any) => ({
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
        blockName: user.apartment.block.name,
      } : null,
      unpaidDuesCount: user.apartment?.dues?.length || 0,
      totalUnpaidAmount: user.apartment?.dues?.reduce((sum: number, due: any) => sum + Number(due.amount), 0) || 0,
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
    const { fullName, email, phone, role, apartmentId, password } = body;

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

    // E-posta benzersizlik kontrolü
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 }
      );
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

    // Şifre hash'leme (varsayılan şifre: email'in @ öncesi kısmı + 123)
    const defaultPassword = password || email.split('@')[0] + '123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const user = await db.user.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        role,
        apartmentId: apartmentId || null,
        password: hashedPassword,
        isActive: true,
      },
      include: {
        apartment: {
          include: {
            block: true,
          },
        },
      },
    });

    return NextResponse.json({
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
        blockName: user.apartment.block.name,
      } : null,
      unpaidDuesCount: 0,
      totalUnpaidAmount: 0,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 