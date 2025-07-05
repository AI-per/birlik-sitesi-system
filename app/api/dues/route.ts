import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/dues - Tüm aidatları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const isPaid = searchParams.get('isPaid');
    const apartmentId = searchParams.get('apartmentId');

    // Build where clause
    const whereClause: any = {};
    
    if (month) {
      whereClause.month = parseInt(month);
    }
    
    if (year) {
      whereClause.year = parseInt(year);
    }
    
    if (apartmentId) {
      whereClause.apartmentId = apartmentId;
    }

    // Fetch dues from database with all necessary relationships
    const dues = await db.due.findMany({
      where: whereClause,
      include: {
        apartment: {
          include: {
            block: true,
            resident: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              }
            },
            owner: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              }
            }
          }
        },
        payment: {
          include: {
            payer: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              }
            }
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { apartment: { block: { name: 'asc' } } },
        { apartment: { number: 'asc' } }
      ]
    });

    // Transform the data to match frontend expectations
    const transformedDues = dues.map((due) => {
      // Get the primary resident (prioritize resident, fallback to owner)
      const primaryResident = due.apartment.resident || due.apartment.owner;
      
      return {
        id: due.id,
        apartmentId: due.apartmentId,
        amount: parseFloat(due.amount.toString()),
        month: due.month,
        year: due.year,
        dueDate: due.dueDate.toISOString(),
        isPaid: !!due.payment, // Has payment = is paid
        paidDate: due.payment?.paymentDate?.toISOString() || null,
        paidAmount: due.payment ? parseFloat(due.payment.amount.toString()) : null,
        createdAt: due.createdAt.toISOString(),
        updatedAt: due.updatedAt.toISOString(),
        description: due.description,
        apartment: {
          id: due.apartment.id,
          number: due.apartment.number,
          floor: due.apartment.floor,
          block: {
            id: due.apartment.block.id,
            name: due.apartment.block.name
          },
          resident: primaryResident ? {
            id: primaryResident.id,
            fullName: primaryResident.fullName,
            email: primaryResident.email || '',
            phone: primaryResident.phone
          } : {
            id: '',
            fullName: 'Boş Daire',
            email: '',
            phone: ''
          }
        }
      };
    });

    // Apply isPaid filter after transformation if needed
    let filteredDues = transformedDues;
    if (isPaid !== null) {
      const paidFilter = isPaid === 'true';
      filteredDues = transformedDues.filter(due => due.isPaid === paidFilter);
    }

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
    const { apartmentId, amount, month, year, dueDate, description, isAutomaticDue = true } = body;

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

    // Daire var mı kontrol et
    const apartment = await db.apartment.findUnique({
      where: { id: apartmentId },
    });

    if (!apartment) {
      return NextResponse.json(
        { error: "Seçilen daire bulunamadı" },
        { status: 404 }
      );
    }

    // Aynı ay/yıl için aidat var mı kontrol et (sadece otomatik aidatlar için)
    if (isAutomaticDue) {
      const existingDue = await db.due.findFirst({
        where: {
          apartmentId,
          month,
          year,
          isAutomaticDue: true
        }
      });

      if (existingDue) {
        return NextResponse.json(
          { error: "Bu ay için otomatik aidat zaten mevcut" },
          { status: 400 }
        );
      }
    }

    // Yeni aidat oluştur
    const newDue = await db.due.create({
      data: {
        apartmentId,
        amount,
        month,
        year,
        dueDate: new Date(dueDate),
        description,
        isAutomaticDue
      },
      include: {
        apartment: {
          include: {
            block: true,
            resident: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              }
            },
            owner: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              }
            }
          }
        }
      }
    });

    // Transform response to match frontend format
    const primaryResident = newDue.apartment.resident || newDue.apartment.owner;
    
    const response = {
      id: newDue.id,
      apartmentId: newDue.apartmentId,
      amount: parseFloat(newDue.amount.toString()),
      month: newDue.month,
      year: newDue.year,
      dueDate: newDue.dueDate.toISOString(),
      isPaid: false,
      paidDate: null,
      paidAmount: null,
      createdAt: newDue.createdAt.toISOString(),
      updatedAt: newDue.updatedAt.toISOString(),
      description: newDue.description,
      apartment: {
        id: newDue.apartment.id,
        number: newDue.apartment.number,
        floor: newDue.apartment.floor,
        block: {
          id: newDue.apartment.block.id,
          name: newDue.apartment.block.name
        },
        resident: primaryResident ? {
          id: primaryResident.id,
          fullName: primaryResident.fullName,
          email: primaryResident.email || '',
          phone: primaryResident.phone
        } : {
          id: '',
          fullName: 'Boş Daire',
          email: '',
          phone: ''
        }
      }
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating due:", error);
    return NextResponse.json(
      { error: "Aidat oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 