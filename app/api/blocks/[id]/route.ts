import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/blocks/[id] - Blok detaylarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const block = await db.block.findUnique({
      where: { id: params.id },
      include: {
        apartments: {
          include: {
            residents: true,
          },
          orderBy: {
            number: 'asc',
          },
        },
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
      createdAt: formatDate(new Date(block.createdAt)),
      apartmentCount: block.apartments.length,
      apartments: block.apartments.map((apartment: any) => ({
        id: apartment.id,
        number: apartment.number,
        floor: apartment.floor,
        type: apartment.type,
        squareMeters: apartment.squareMeters,
        residents: apartment.residents.map((resident: any) => ({
          id: resident.id,
          fullName: resident.fullName,
          email: resident.email,
          phone: resident.phone,
        })),
      })),
    });
  } catch (error) {
    console.error("Error fetching block details:", error);
    return NextResponse.json(
      { error: "Blok detayları yüklenirken hata oluştu" },
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

    // Aynı isimde başka blok var mı kontrol et
    const existingBlock = await db.block.findFirst({
      where: {
        name: name.trim(),
        NOT: {
          id: params.id
        }
      },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "Bu isimde bir blok zaten mevcut" },
        { status: 400 }
      );
    }

    const updatedBlock = await db.block.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
      },
      include: {
        apartments: true,
      },
    });

    return NextResponse.json({
      id: updatedBlock.id,
      name: updatedBlock.name,
      createdAt: formatDate(new Date(updatedBlock.createdAt)),
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
    await db.block.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Blok başarıyla silindi",
    });
  } catch (error) {
    console.error("Error deleting block:", error);
    return NextResponse.json(
      { error: "Blok silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 