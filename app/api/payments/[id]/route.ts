import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/payments/[id] - Get single payment details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const payment = await db.payment.findUnique({
      where: { id },
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
            phone: true,
            role: true
          }
        }
      }
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Ödeme bulunamadı" },
        { status: 404 }
      );
    }

    // Authorization check - users can only see their own payments unless they're admin/manager
    if (user.role !== 'ADMIN' && user.role !== 'MANAGER' && payment.payerId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

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
        isAutomaticDue: payment.due.isAutomaticDue,
        apartment: {
          id: payment.due.apartment.id,
          number: payment.due.apartment.number,
          floor: payment.due.apartment.floor,
          type: payment.due.apartment.type,
          squareMeters: payment.due.apartment.squareMeters,
          block: {
            id: payment.due.apartment.block.id,
            name: payment.due.apartment.block.name
          }
        }
      },
      payer: payment.payer
    };

    return NextResponse.json(transformedPayment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { error: "Ödeme yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
} 