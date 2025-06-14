import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/apartments - Tüm daireleri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('blockId');

    const whereClause = blockId ? { blockId } : {};

    const apartments = await db.apartment.findMany({
      where: whereClause,
      include: {
        block: true,
        residents: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
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
      orderBy: [
        { block: { name: 'asc' } },
        { floor: 'asc' },
        { number: 'asc' },
      ],
    });

    const apartmentsWithDetails = apartments.map((apartment: any) => ({
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      type: apartment.type,
      squareMeters: apartment.squareMeters,
      blockId: apartment.blockId,
      blockName: apartment.block.name,
      createdAt: apartment.createdAt.toISOString().split('T')[0],
      residentCount: apartment.residents.length,
      residents: apartment.residents,
      unpaidDuesCount: apartment.dues.length,
      totalUnpaidAmount: apartment.dues.reduce((sum: number, due: any) => sum + Number(due.amount), 0),
    }));

    return NextResponse.json(apartmentsWithDetails);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return NextResponse.json(
      { error: "Daireler yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/apartments - Yeni daire oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { number, floor, type, squareMeters, blockId } = body;

    // Validasyon
    if (!number || floor === undefined || floor === null || !blockId) {
      return NextResponse.json(
        { error: "Daire numarası, kat ve blok bilgisi gereklidir" },
        { status: 400 }
      );
    }

    if (typeof floor !== 'number' || floor < 0) {
      return NextResponse.json(
        { error: "Kat numarası geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Blok var mı kontrol et
    const block = await db.block.findUnique({
      where: { id: blockId },
    });

    if (!block) {
      return NextResponse.json(
        { error: "Seçilen blok bulunamadı" },
        { status: 400 }
      );
    }

    // Aynı blokta aynı numaralı daire var mı kontrol et
    const existingApartment = await db.apartment.findUnique({
      where: {
        blockId_number: {
          blockId,
          number: number.toString(),
        },
      },
    });

    if (existingApartment) {
      return NextResponse.json(
        { error: "Bu blokta aynı numaralı daire zaten mevcut" },
        { status: 400 }
      );
    }

    const apartment = await db.apartment.create({
      data: {
        number: number.toString(),
        floor: parseInt(floor.toString()),
        type: type || null,
        squareMeters: squareMeters ? parseInt(squareMeters.toString()) : null,
        blockId,
      },
      include: {
        block: true,
        residents: true,
      },
    });

    return NextResponse.json({
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      type: apartment.type,
      squareMeters: apartment.squareMeters,
      blockId: apartment.blockId,
      blockName: apartment.block.name,
      createdAt: apartment.createdAt.toISOString().split('T')[0],
      residentCount: apartment.residents.length,
      residents: apartment.residents,
      unpaidDuesCount: 0,
      totalUnpaidAmount: 0,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating apartment:", error);
    return NextResponse.json(
      { error: "Daire oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 