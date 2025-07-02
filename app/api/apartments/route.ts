import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// Mock data for testing
const mockApartments = [
  {
    id: "apt-1",
    number: "A-101",
    floor: 1,
    type: "2+1",
    squareMeters: 85,
    blockId: "block-1",
    block: {
      id: "block-1",
      name: "A Blok"
    },
    resident: {
      id: "user-1",
      fullName: "Ali Kaya",
      email: "ali.kaya@email.com",
      phone: "0532 123 45 67"
    }
  },
  {
    id: "apt-2",
    number: "A-102",
    floor: 1,
    type: "3+1",
    squareMeters: 110,
    blockId: "block-1",
    block: {
      id: "block-1",
      name: "A Blok"
    },
    resident: {
      id: "user-2",
      fullName: "Ayşe Demir",
      email: "ayse.demir@email.com",
      phone: "0533 234 56 78"
    }
  },
  {
    id: "apt-3",
    number: "B-201",
    floor: 2,
    type: "2+1",
    squareMeters: 90,
    blockId: "block-2",
    block: {
      id: "block-2",
      name: "B Blok"
    },
    resident: {
      id: "user-3",
      fullName: "Mehmet Özkan",
      email: "mehmet.ozkan@email.com",
      phone: "0534 345 67 89"
    }
  },
  {
    id: "apt-4",
    number: "B-202",
    floor: 2,
    type: "3+1",
    squareMeters: 120,
    blockId: "block-2",
    block: {
      id: "block-2",
      name: "B Blok"
    },
    resident: null
  }
];

// GET /api/apartments - Tüm daireleri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('blockId');

    let filteredApartments = [...mockApartments];
    
    if (blockId) {
      filteredApartments = filteredApartments.filter(apt => apt.blockId === blockId);
    }

    return NextResponse.json(filteredApartments);
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

    // Aynı blokta aynı numaralı daire var mı kontrol et
    const existingApartment = mockApartments.find(apt => 
      apt.blockId === blockId && apt.number === number.toString()
    );

    if (existingApartment) {
      return NextResponse.json(
        { error: "Bu blokta aynı numaralı daire zaten mevcut" },
        { status: 400 }
      );
    }

    // Yeni daire oluştur
    const newApartment = {
      id: `apt-${mockApartments.length + 1}`,
      number: number.toString(),
      floor: parseInt(floor.toString()),
      type: type || "2+1",
      squareMeters: squareMeters ? parseInt(squareMeters.toString()) : 85,
      blockId,
      block: {
        id: blockId,
        name: blockId === "block-1" ? "A Blok" : "B Blok"
      },
      resident: null
    };

    // Mock data'ya ekle (type assertion kullanarak)
    (mockApartments as any[]).push(newApartment);

    return NextResponse.json(newApartment, { status: 201 });
  } catch (error) {
    console.error("Error creating apartment:", error);
    return NextResponse.json(
      { error: "Daire oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 