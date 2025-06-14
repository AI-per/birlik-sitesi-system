import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blocks - Tüm blokları listele
export async function GET() {
  try {
    const blocks = await db.block.findMany({
      include: {
        apartments: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Daire sayısını hesapla
    const blocksWithApartmentCount = blocks.map((block: any) => ({
      id: block.id,
      name: block.name,
      createdAt: block.createdAt.toISOString().split('T')[0],
      apartmentCount: block.apartments.length,
    }));

    return NextResponse.json(blocksWithApartmentCount);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return NextResponse.json(
      { error: "Bloklar yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/blocks - Yeni blok oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Blok adı gereklidir" },
        { status: 400 }
      );
    }

    // Aynı isimde blok var mı kontrol et
    const existingBlock = await db.block.findUnique({
      where: { name: name.trim() },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "Bu isimde bir blok zaten mevcut" },
        { status: 400 }
      );
    }

    const block = await db.block.create({
      data: {
        name: name.trim(),
      },
      include: {
        apartments: true,
      },
    });

    return NextResponse.json({
      id: block.id,
      name: block.name,
      createdAt: block.createdAt.toISOString().split('T')[0],
      apartmentCount: block.apartments.length,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating block:", error);
    return NextResponse.json(
      { error: "Blok oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 