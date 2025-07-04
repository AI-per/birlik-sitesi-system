import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// GET /api/users - Tüm kullanıcıları listele
export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        residingApartment: {
          include: {
            block: true,
            dues: {
              include: {
                payment: true,
              },
            },
          },
        },
        ownedApartment: {
          include: {
            block: true,
            dues: {
              include: {
                payment: true,
              },
            },
          },
        },
      },
      orderBy: {
        fullName: 'asc',
      },
    });

    const usersWithDetails = users.map((user: any) => {
      // Calculate unpaid dues for the user's apartment (prioritize residing apartment, fallback to owned)
      let unpaidDuesCount = 0;
      let totalUnpaidAmount = 0;
      const apartment = user.residingApartment || user.ownedApartment;
      
      if (apartment && apartment.dues) {
        const unpaidDues = apartment.dues.filter((due: any) => !due.payment);
        unpaidDuesCount = unpaidDues.length;
        totalUnpaidAmount = unpaidDues.reduce((sum: number, due: any) => sum + Number(due.amount), 0);
      }

      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt.toISOString(),
        detail_url: `/dashboard/users/${user.id}`,
        apartment: apartment ? {
          id: apartment.id,
          number: apartment.number,
          floor: apartment.floor,
          blockName: apartment.block.name,
        } : null,
        unpaidDuesCount,
        totalUnpaidAmount,
      };
    });

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
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Tam ad ve telefon numarası gereklidir" },
        { status: 400 }
      );
    }

    // Email varsa formatını kontrol et
    if (email && email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
          { error: "Geçerli bir email adresi girin" },
        { status: 400 }
      );
    }

      // Mevcut email kontrolü (sadece email verilmişse)
    const existingUser = await db.user.findUnique({
        where: { email: email.trim() },
    });

    if (existingUser) {
      return NextResponse.json(
          { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // Kullanıcıyı oluştur
    const user = await db.user.create({
      data: {
        email: email?.trim() || null,
        password: hashedPassword,
        fullName,
        phone: phone.trim(),
        role: role || 'RESIDENT',
      },
    });

    // Apartment ID varsa ilişkiyi kur
    let apartment = null;
    if (apartmentId) {
      apartment = await db.apartment.findUnique({
        where: { id: apartmentId },
        include: { block: true },
      });

      if (!apartment) {
        return NextResponse.json(
          { error: "Seçilen daire bulunamadı" },
          { status: 400 }
        );
      }

      // Role göre uygun ilişkiyi kur
      if (role === 'RESIDENT') {
        // Dairede zaten sakin var mı kontrol et
        if (apartment.residentId) {
          return NextResponse.json(
            { error: "Bu dairede zaten bir sakin kayıtlı" },
            { status: 400 }
          );
        }
        
        await db.apartment.update({
          where: { id: apartmentId },
          data: { residentId: user.id },
        });
      } else if (role === 'LANDLORD') {
        // Dairede zaten malik var mı kontrol et
        if (apartment.ownerId) {
          return NextResponse.json(
            { error: "Bu dairede zaten bir malik kayıtlı" },
            { status: 400 }
          );
        }
        
        await db.apartment.update({
          where: { id: apartmentId },
          data: { ownerId: user.id },
        });
      }
    }

    // Şifreyi response'tan çıkar
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      ...userWithoutPassword,
      createdAt: user.createdAt.toISOString(),
      detail_url: `/dashboard/users/${user.id}`,
      apartment: apartment ? {
        id: apartment.id,
        number: apartment.number,
        floor: apartment.floor,
        blockName: apartment.block.name,
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