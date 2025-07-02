import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/blocks - Tüm blokları listele
export async function GET() {
  try {
    console.log("Starting to fetch blocks...");
    console.log("Database URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
    
    const blocks = await db.block.findMany({
      include: {
        apartments: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    console.log("Blocks fetched successfully:", blocks.length);

    // Daire sayısını hesapla
    const blocksWithApartmentCount = blocks.map((block: any) => ({
      id: block.id,
      name: block.name,
      createdAt: formatDate(new Date(block.createdAt)),
      apartmentCount: block.apartments.length,
      detail_url: `/dashboard/blocks/${block.id}`,
    }));

    return NextResponse.json(blocksWithApartmentCount);
  } catch (error) {
    console.error("Detailed error fetching blocks:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { error: "Bloklar yüklenirken hata oluştu", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/blocks - Yeni blok oluştur
export async function POST(request: NextRequest) {
  try {
    console.log("Starting to create block...");
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Blok adı gereklidir" },
        { status: 400 }
      );
    }

    console.log("Creating block with name:", name.trim());

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

    console.log("Block created successfully:", block);

    return NextResponse.json({
      id: block.id,
      name: block.name,
      createdAt: formatDate(new Date(block.createdAt)),
      apartmentCount: block.apartments.length,
      detail_url: `/dashboard/blocks/${block.id}`,
    }, { status: 201 });
  } catch (error) {
    console.error("Detailed error creating block:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { error: "Blok oluşturulurken hata oluştu", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 