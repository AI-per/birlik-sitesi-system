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
        resident: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        dues: {
          include: {
            payment: true,
          },
        },
      },
      orderBy: [
        { blockId: 'asc' },
        { number: 'asc' },
      ],
    });

    const apartmentsWithDetails = apartments.map((apartment: any) => {
      // Calculate unpaid dues for this apartment
      const unpaidDues = apartment.dues.filter((due: any) => !due.payment);
      const unpaidDuesCount = unpaidDues.length;
      const totalUnpaidAmount = unpaidDues.reduce((sum: number, due: any) => sum + Number(due.amount), 0);

      return {
        id: apartment.id,
        number: apartment.number,
        floor: apartment.floor,
        blockId: apartment.blockId,
        blockName: apartment.block.name,
        createdAt: formatDate(new Date(apartment.createdAt)),
        resident: apartment.resident,
        owner: apartment.owner,
        // For backward compatibility, provide residents array (legacy frontend support)
        residents: apartment.resident ? [apartment.resident] : [],
        residentCount: apartment.resident ? 1 : 0,
        unpaidDuesCount: unpaidDuesCount,
        totalUnpaidAmount: totalUnpaidAmount,
        block: {
          id: apartment.block.id,
          name: apartment.block.name,
        },
        detail_url: `/dashboard/apartments/${apartment.id}`,
      };
    });

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
    const { number, floor, blockId } = body;

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
        blockId,
      },
      include: {
        block: true,
        resident: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        dues: {
          include: {
            payment: true,
          },
        },
      },
    });

    // Calculate unpaid dues for the new apartment
    const unpaidDues = apartment.dues.filter((due: any) => !due.payment);
    const unpaidDuesCount = unpaidDues.length;
    const totalUnpaidAmount = unpaidDues.reduce((sum: number, due: any) => sum + Number(due.amount), 0);

    return NextResponse.json({
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      blockId: apartment.blockId,
      blockName: apartment.block.name,
      createdAt: formatDate(new Date(apartment.createdAt)),
      resident: apartment.resident,
      owner: apartment.owner,
      // For backward compatibility, provide residents array (legacy frontend support)
      residents: apartment.resident ? [apartment.resident] : [],
      residentCount: apartment.resident ? 1 : 0,
      unpaidDuesCount: unpaidDuesCount,
      totalUnpaidAmount: totalUnpaidAmount,
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