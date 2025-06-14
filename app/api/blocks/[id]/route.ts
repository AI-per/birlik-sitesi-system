import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blocks/[id] - Tek blok detayı
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const block = await db.block.findUnique({
      where: { id: params.id },
      include: {
        apartments: true,
      },
    });

    if (!block) {
      return NextResponse.json(
        { error: "Blok bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: block.id,
      name: block.name,
      createdAt: block.createdAt.toISOString().split('T')[0],
      apartmentCount: block.apartments.length,
    });
  } catch (error) {
    console.error("Error fetching block:", error);
    return NextResponse.json(
      { error: "Blok yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/blocks/[id] - Blok güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Blok adı gereklidir" },
        { status: 400 }
      );
    }

    // Mevcut blok var mı kontrol et
    const existingBlock = await db.block.findUnique({
      where: { id: params.id },
    });

    if (!existingBlock) {
      return NextResponse.json(
        { error: "Blok bulunamadı" },
        { status: 404 }
      );
    }

    // Aynı isimde başka blok var mı kontrol et (kendisi hariç)
    const duplicateBlock = await db.block.findFirst({
      where: {
        name: name.trim(),
        id: { not: params.id },
      },
    });

    if (duplicateBlock) {
      return NextResponse.json(
        { error: "Bu isimde bir blok zaten mevcut" },
        { status: 400 }
      );
    }

    const updatedBlock = await db.block.update({
      where: { id: params.id },
      data: { name: name.trim() },
      include: {
        apartments: true,
      },
    });

    return NextResponse.json({
      id: updatedBlock.id,
      name: updatedBlock.name,
      createdAt: updatedBlock.createdAt.toISOString().split('T')[0],
      apartmentCount: updatedBlock.apartments.length,
    });
  } catch (error) {
    console.error("Error updating block:", error);
    return NextResponse.json(
      { error: "Blok güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/blocks/[id] - Blok sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mevcut blok var mı kontrol et
    const existingBlock = await db.block.findUnique({
      where: { id: params.id },
      include: {
        apartments: {
          include: {
            residents: true,
            dues: true,
          },
        },
      },
    });

    if (!existingBlock) {
      return NextResponse.json(
        { error: "Blok bulunamadı" },
        { status: 404 }
      );
    }

    // Blokta daire var mı kontrol et
    if (existingBlock.apartments.length > 0) {
      return NextResponse.json(
        { error: "Bu blokta daireler bulunduğu için silinemez. Önce daireleri silin." },
        { status: 400 }
      );
    }

    await db.block.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Blok başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting block:", error);
    return NextResponse.json(
      { error: "Blok silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 