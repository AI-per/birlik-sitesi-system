import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// Mock data (same as in the main route)
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
  }
];

// GET /api/dues/[id] - Tekil aidat getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const due = mockDues.find(d => d.id === id);

    if (!due) {
      return NextResponse.json(
        { error: "Aidat bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(due);
  } catch (error) {
    console.error("Error fetching due:", error);
    return NextResponse.json(
      { error: "Aidat yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/dues/[id] - Aidat güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { amount, month, year, dueDate, isPaid, paidAmount, paidDate } = body;

    // Aidat kontrolü
    const dueIndex = mockDues.findIndex(d => d.id === id);
    if (dueIndex === -1) {
      return NextResponse.json(
        { error: "Aidat bulunamadı" },
        { status: 404 }
      );
    }

    const due = mockDues[dueIndex];

    // Validasyon
    if (amount !== undefined && amount <= 0) {
      return NextResponse.json(
        { error: "Tutar pozitif olmalıdır" },
        { status: 400 }
      );
    }

    if (month !== undefined && (month < 1 || month > 12)) {
      return NextResponse.json(
        { error: "Geçerli bir ay giriniz (1-12)" },
        { status: 400 }
      );
    }

    if (year !== undefined && year < 2020) {
      return NextResponse.json(
        { error: "Geçerli bir yıl giriniz" },
        { status: 400 }
      );
    }

    // Aidat güncelle
    const updatedDue = {
      ...due,
      amount: amount ?? due.amount,
      month: month ?? due.month,
      year: year ?? due.year,
      dueDate: dueDate ? new Date(dueDate).toISOString() : due.dueDate,
      isPaid: isPaid ?? due.isPaid,
      paidAmount: paidAmount ?? due.paidAmount,
      paidDate: paidDate ? new Date(paidDate).toISOString() : due.paidDate,
      updatedAt: new Date().toISOString(),
    };

    mockDues[dueIndex] = updatedDue;

    return NextResponse.json(updatedDue);
  } catch (error) {
    console.error("Error updating due:", error);
    return NextResponse.json(
      { error: "Aidat güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/dues/[id] - Aidat sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Aidat kontrolü
    const dueIndex = mockDues.findIndex(d => d.id === id);
    if (dueIndex === -1) {
      return NextResponse.json(
        { error: "Aidat bulunamadı" },
        { status: 404 }
      );
    }

    const due = mockDues[dueIndex];

    // Ödenmiş aidat silinemez
    if (due.isPaid) {
      return NextResponse.json(
        { error: "Ödenmiş aidat silinemez" },
        { status: 400 }
      );
    }

    // Aidat sil
    mockDues.splice(dueIndex, 1);

    return NextResponse.json({ message: "Aidat başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting due:", error);
    return NextResponse.json(
      { error: "Aidat silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 