import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/apartments/[id] - Tek daire detayı
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const apartment = await db.apartment.findUnique({
      where: { id: params.id },
      include: {
        block: true,
        residents: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            role: true,
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

    const apartmentWithDetails = {
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      type: apartment.type,
      squareMeters: apartment.squareMeters,
      blockId: apartment.blockId,
      blockName: apartment.block.name,
      createdAt: apartment.createdAt.toISOString().split('T')[0],
      residents: apartment.residents,
      dues: apartment.dues.map((due: any) => ({
        id: due.id,
        amount: Number(due.amount),
        dueDate: due.dueDate.toISOString().split('T')[0],
        month: due.month,
        year: due.year,
        description: due.description,
        isPaid: !!due.payment,
        paymentDate: due.payment?.paymentDate?.toISOString().split('T')[0] || null,
      })),
    };

    return NextResponse.json(apartmentWithDetails);
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { number, floor, type, squareMeters, blockId } = body;

    // Validasyon
    if (!number || floor === undefined || !blockId) {
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

    // Mevcut daire var mı kontrol et
    const existingApartment = await db.apartment.findUnique({
      where: { id: params.id },
    });

    if (!existingApartment) {
      return NextResponse.json(
        { error: "Daire bulunamadı" },
        { status: 404 }
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

    // Aynı blokta aynı numaralı başka daire var mı kontrol et (kendisi hariç)
    const duplicateApartment = await db.apartment.findFirst({
      where: {
        blockId,
        number: number.toString(),
        id: { not: params.id },
      },
    });

    if (duplicateApartment) {
      return NextResponse.json(
        { error: "Bu blokta aynı numaralı daire zaten mevcut" },
        { status: 400 }
      );
    }

    const updatedApartment = await db.apartment.update({
      where: { id: params.id },
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
      id: updatedApartment.id,
      number: updatedApartment.number,
      floor: updatedApartment.floor,
      type: updatedApartment.type,
      squareMeters: updatedApartment.squareMeters,
      blockId: updatedApartment.blockId,
      blockName: updatedApartment.block.name,
      createdAt: updatedApartment.createdAt.toISOString().split('T')[0],
      residentCount: updatedApartment.residents.length,
      residents: updatedApartment.residents,
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
  { params }: { params: { id: string } }
) {
  try {
    // Mevcut daire var mı kontrol et
    const existingApartment = await db.apartment.findUnique({
      where: { id: params.id },
      include: {
        residents: true,
        dues: true,
      },
    });

    if (!existingApartment) {
      return NextResponse.json(
        { error: "Daire bulunamadı" },
        { status: 404 }
      );
    }

    // Dairede sakin var mı kontrol et
    if (existingApartment.residents.length > 0) {
      return NextResponse.json(
        { error: "Bu dairede sakinler bulunduğu için silinemez. Önce sakini kaldırın." },
        { status: 400 }
      );
    }

    // Ödenmemiş aidat var mı kontrol et
    const unpaidDues = existingApartment.dues.filter((due: any) => !due.payment);
    if (unpaidDues.length > 0) {
      return NextResponse.json(
        { error: "Bu dairenin ödenmemiş aidatları bulunduğu için silinemez." },
        { status: 400 }
      );
    }

    await db.apartment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Daire başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    return NextResponse.json(
      { error: "Daire silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 