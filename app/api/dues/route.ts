import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// Mock data for testing
const mockDues = [
  {
    id: "1",
    apartmentId: "apt-1",
    amount: 1500,
    month: 1,
    year: 2024,
    dueDate: new Date('2024-01-31T23:59:59Z').toISOString(),
    isPaid: true,
    paidDate: new Date('2024-01-15T10:30:00Z').toISOString(),
    paidAmount: 1500,
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:30:00Z').toISOString(),
    apartment: {
      id: "apt-1",
      number: "A-101",
      floor: 1,
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
    }
  },
  {
    id: "2",
    apartmentId: "apt-2",
    amount: 1500,
    month: 1,
    year: 2024,
    dueDate: new Date('2024-01-31T23:59:59Z').toISOString(),
    isPaid: false,
    paidDate: null,
    paidAmount: null,
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    apartment: {
      id: "apt-2",
      number: "A-102",
      floor: 1,
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
    }
  },
  {
    id: "3",
    apartmentId: "apt-3",
    amount: 1500,
    month: 2,
    year: 2024,
    dueDate: new Date('2024-02-29T23:59:59Z').toISOString(),
    isPaid: true,
    paidDate: new Date('2024-02-10T14:20:00Z').toISOString(),
    paidAmount: 1500,
    createdAt: new Date('2024-02-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-02-10T14:20:00Z').toISOString(),
    apartment: {
      id: "apt-3",
      number: "B-201",
      floor: 2,
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
    }
  },
  {
    id: "4",
    apartmentId: "apt-1",
    amount: 1600,
    month: 2,
    year: 2024,
    dueDate: new Date('2024-02-29T23:59:59Z').toISOString(),
    isPaid: false,
    paidDate: null,
    paidAmount: null,
    createdAt: new Date('2024-02-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-02-01T00:00:00Z').toISOString(),
    apartment: {
      id: "apt-1",
      number: "A-101",
      floor: 1,
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
    }
  },
  {
    id: "5",
    apartmentId: "apt-2",
    amount: 1600,
    month: 2,
    year: 2024,
    dueDate: new Date('2024-02-29T23:59:59Z').toISOString(),
    isPaid: false,
    paidDate: null,
    paidAmount: null,
    createdAt: new Date('2024-02-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-02-01T00:00:00Z').toISOString(),
    apartment: {
      id: "apt-2",
      number: "A-102",
      floor: 1,
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
    }
  }
];

// GET /api/dues - Tüm aidatları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const isPaid = searchParams.get('isPaid');
    const apartmentId = searchParams.get('apartmentId');

    let filteredDues = [...mockDues];
    
    if (month) {
      filteredDues = filteredDues.filter(due => due.month === parseInt(month));
    }
    
    if (year) {
      filteredDues = filteredDues.filter(due => due.year === parseInt(year));
    }
    
    if (isPaid !== null) {
      const paidFilter = isPaid === 'true';
      filteredDues = filteredDues.filter(due => due.isPaid === paidFilter);
    }
    
    if (apartmentId) {
      filteredDues = filteredDues.filter(due => due.apartmentId === apartmentId);
    }

    // Tarihe göre sırala (en yeni önce)
    filteredDues.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    return NextResponse.json(filteredDues);
  } catch (error) {
    console.error("Error fetching dues:", error);
    return NextResponse.json(
      { error: "Aidatlar yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/dues - Yeni aidat oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apartmentId, amount, month, year, dueDate } = body;

    // Validasyon
    if (!apartmentId || !amount || !month || !year || !dueDate) {
      return NextResponse.json(
        { error: "Tüm alanlar gereklidir" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Tutar pozitif olmalıdır" },
        { status: 400 }
      );
    }

    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: "Geçerli bir ay giriniz (1-12)" },
        { status: 400 }
      );
    }

    if (year < 2020) {
      return NextResponse.json(
        { error: "Geçerli bir yıl giriniz" },
        { status: 400 }
      );
    }

    // Aynı ay/yıl için aidat var mı kontrol et
    const existingDue = mockDues.find(due => 
      due.apartmentId === apartmentId && 
      due.month === month && 
      due.year === year
    );

    if (existingDue) {
      return NextResponse.json(
        { error: "Bu ay için aidat zaten mevcut" },
        { status: 400 }
      );
    }

    // Yeni aidat oluştur
    const newDue = {
      id: (mockDues.length + 1).toString(),
      apartmentId,
      amount,
      month,
      year,
      dueDate: new Date(dueDate).toISOString(),
      isPaid: false,
      paidDate: null,
      paidAmount: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      apartment: {
        id: apartmentId,
        number: "A-101", // Mock data
        floor: 1,
        block: {
          id: "block-1",
          name: "A Blok"
        },
        resident: {
          id: "user-1",
          fullName: "Test User",
          email: "test@email.com",
          phone: "0532 123 45 67"
        }
      }
    };

    // Mock data'ya ekle
    mockDues.unshift(newDue);

    return NextResponse.json(newDue, { status: 201 });
  } catch (error) {
    console.error("Error creating due:", error);
    return NextResponse.json(
      { error: "Aidat oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 