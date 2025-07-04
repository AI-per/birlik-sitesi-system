import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// GET /api/payments - Get all payments with filtering
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const apartmentId = searchParams.get('apartmentId');
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build where conditions
    const whereConditions: any = {};

    // Role-based filtering
    if (user.role === 'RESIDENT' || user.role === 'LANDLORD') {
      whereConditions.payerId = user.id;
    } else if (userId) {
      whereConditions.payerId = userId;
    }

    if (apartmentId) {
      whereConditions.due = {
        apartmentId: apartmentId
      };
    }

    if (month && year) {
      whereConditions.due = {
        ...whereConditions.due,
        month: parseInt(month),
        year: parseInt(year)
      };
    }

    if (startDate && endDate) {
      whereConditions.paymentDate = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const payments = await db.payment.findMany({
      where: whereConditions,
      include: {
        due: {
          include: {
            apartment: {
              include: {
                block: true
              }
            }
          }
        },
        payer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        paymentDate: 'desc'
      }
    });

    // Transform data for frontend
    const transformedPayments = payments.map(payment => ({
      id: payment.id,
      amount: Number(payment.amount),
      paymentDate: payment.paymentDate.toISOString(),
      paymentMethod: payment.paymentMethod,
      receiptNumber: payment.receiptNumber,
      notes: payment.notes,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
      due: {
        id: payment.due.id,
        amount: Number(payment.due.amount),
        month: payment.due.month,
        year: payment.due.year,
        dueDate: payment.due.dueDate.toISOString(),
        description: payment.due.description,
        apartment: {
          id: payment.due.apartment.id,
          number: payment.due.apartment.number,
          floor: payment.due.apartment.floor,
          block: {
            id: payment.due.apartment.block.id,
            name: payment.due.apartment.block.name
          }
        }
      },
      payer: payment.payer
    }));

    return NextResponse.json(transformedPayments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Ödemeler yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { dueId, amount, paymentDate, paymentMethod, receiptNumber, notes, payerId } = body;

    // Validation
    if (!dueId || !amount) {
      return NextResponse.json(
        { error: "Aidat ID ve tutar gereklidir" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Ödeme tutarı pozitif olmalıdır" },
        { status: 400 }
      );
    }

    // Check if due exists and is not already paid
    const due = await db.due.findUnique({
      where: { id: dueId },
      include: {
        apartment: {
          include: {
            block: true,
            residents: {
              select: {
                id: true,
                fullName: true
              },
              take: 1
            }
          }
        },
        payment: true
      }
    });

    if (!due) {
      return NextResponse.json(
        { error: "Aidat bulunamadı" },
        { status: 404 }
      );
    }

    if (due.payment) {
      return NextResponse.json(
        { error: "Bu aidat zaten ödenmiş" },
        { status: 400 }
      );
    }

    // Determine payer - if not specified, use current user or the resident of the apartment
    let actualPayerId = payerId || user.id;
    
    // If user is admin/manager and no specific payer provided, use apartment resident
    if (!payerId && (user.role === 'ADMIN' || user.role === 'MANAGER') && due.apartment.residents.length > 0) {
      actualPayerId = due.apartment.residents[0].id;
    }

    // Create payment
    const payment = await db.payment.create({
      data: {
        dueId,
        payerId: actualPayerId,
        amount: parseFloat(amount.toString()),
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
        paymentMethod: paymentMethod || null,
        receiptNumber: receiptNumber || null,
        notes: notes || null,
      },
      include: {
        due: {
          include: {
            apartment: {
              include: {
                block: true
              }
            }
          }
        },
        payer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true
          }
        }
      }
    });

    // Transform data for frontend
    const transformedPayment = {
      id: payment.id,
      amount: Number(payment.amount),
      paymentDate: payment.paymentDate.toISOString(),
      paymentMethod: payment.paymentMethod,
      receiptNumber: payment.receiptNumber,
      notes: payment.notes,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
      due: {
        id: payment.due.id,
        amount: Number(payment.due.amount),
        month: payment.due.month,
        year: payment.due.year,
        dueDate: payment.due.dueDate.toISOString(),
        description: payment.due.description,
        apartment: {
          id: payment.due.apartment.id,
          number: payment.due.apartment.number,
          floor: payment.due.apartment.floor,
          block: {
            id: payment.due.apartment.block.id,
            name: payment.due.apartment.block.name
          }
        }
      },
      payer: payment.payer
    };

    return NextResponse.json(transformedPayment, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Ödeme oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 