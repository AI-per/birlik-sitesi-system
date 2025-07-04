import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/apartments - Tüm daireleri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('blockId');

    let whereClause: any = {};
    if (blockId) {
      whereClause.blockId = blockId;
    }

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
      },
      orderBy: [
        { blockId: 'asc' },
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
      createdAt: formatDate(new Date(apartment.createdAt)),
      residentCount: apartment.residents.length,
      residents: apartment.residents || [], // Fix: Return full residents array
      resident: apartment.residents.length > 0 ? apartment.residents[0] : null,
      unpaidDuesCount: 0, // TODO: Calculate actual unpaid dues
      totalUnpaidAmount: 0, // TODO: Calculate actual total amount
      block: {
        id: apartment.block.id,
        name: apartment.block.name,
      },
      detail_url: `/dashboard/apartments/${apartment.id}`,
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

    // Gerekli alanları kontrol et
    if (!number || floor === undefined || floor === null || !blockId) {
      return NextResponse.json(
        { error: "Daire numarası, kat ve blok bilgisi gereklidir" },
        { status: 400 }
      );
    }

    const floorNum = parseInt(floor);
    if (isNaN(floorNum) || floorNum < 0) {
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
    const existingApartment = await db.apartment.findFirst({
      where: {
        blockId,
        number: number.trim(),
      },
    });

    if (existingApartment) {
      return NextResponse.json(
        { error: "Bu blokta aynı numaralı daire zaten mevcut" },
        { status: 400 }
      );
    }

    // Yeni daire oluştur
    const apartment = await db.apartment.create({
      data: {
        number: number.trim(),
        floor: floorNum,
        type: type?.trim() || null,
        squareMeters: squareMeters ? parseInt(squareMeters) : null,
      blockId,
      },
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
      createdAt: formatDate(new Date(apartment.createdAt)),
      residentCount: apartment.residents.length,
      residents: apartment.residents || [], // Fix: Return full residents array
      resident: apartment.residents.length > 0 ? apartment.residents[0] : null,
      unpaidDuesCount: 0, // TODO: Calculate actual unpaid dues
      totalUnpaidAmount: 0, // TODO: Calculate actual total amount
      block: {
        id: apartment.block.id,
        name: apartment.block.name,
      },
      detail_url: `/dashboard/apartments/${apartment.id}`,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating apartment:", error);
    return NextResponse.json(
      { error: "Daire oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 