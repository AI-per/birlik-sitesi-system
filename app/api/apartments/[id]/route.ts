import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/apartments/[id] - Daire detaylarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const apartment = await db.apartment.findUnique({
      where: { id },
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
          orderBy: {
            dueDate: 'desc',
          },
        },
      },
    });

    if (!apartment) {
      return NextResponse.json(
        { error: "Daire bulunamadı" },
        { status: 404 }
      );
    }

    const formattedApartment = {
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      blockId: apartment.blockId,
      blockName: apartment.block.name,
      createdAt: formatDate(new Date(apartment.createdAt)),
      resident: apartment.resident,
      owner: apartment.owner,
      dues: apartment.dues.map((due: any) => ({
        id: due.id,
        amount: Number(due.amount),
        month: due.month,
        year: due.year,
        description: due.description,
        dueDate: formatDate(new Date(due.dueDate)),
        isPaid: !!due.payment,
        paymentDate: due.payment?.paymentDate ? formatDate(new Date(due.payment.paymentDate)) : null,
      })),
    };

    return NextResponse.json(formattedApartment);
  } catch (error) {
    console.error("Error fetching apartment:", error);
    return NextResponse.json(
      { error: "Daire yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/apartments/[id] - Daire güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { number, floor, blockId } = body;

    // Gerekli alanları kontrol et
    if (!number || !floor || !blockId) {
      return NextResponse.json(
        { error: "Daire numarası, kat ve blok gereklidir" },
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

    // Aynı blokta aynı numaralı başka daire var mı kontrol et
    const existingApartment = await db.apartment.findFirst({
      where: {
        blockId,
        number: number.trim(),
        NOT: {
          id
        }
      },
    });

    if (existingApartment) {
      return NextResponse.json(
        { error: "Bu blokta aynı numaralı bir daire zaten mevcut" },
        { status: 400 }
      );
    }

    const updatedApartment = await db.apartment.update({
      where: { id },
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
      },
    });

    return NextResponse.json({
      ...updatedApartment,
      createdAt: formatDate(new Date(updatedApartment.createdAt)),
    });
  } catch (error) {
    console.error("Error updating apartment:", error);
    return NextResponse.json(
      { error: "Daire güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/apartments/[id] - Daire sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.apartment.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Daire başarıyla silindi",
    });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    return NextResponse.json(
      { error: "Daire silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 