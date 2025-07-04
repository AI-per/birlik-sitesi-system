import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// GET /api/contact - Get all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only admins and managers can view all contact messages
    if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const isRead = searchParams.get('isRead');
    const senderId = searchParams.get('senderId');

    // Build where conditions
    const whereConditions: any = {};

    if (isRead && isRead !== 'all') {
      whereConditions.isRead = isRead === 'true';
    }

    if (senderId) {
      whereConditions.senderId = senderId;
    }

    const messages = await db.contactMessage.findMany({
      where: whereConditions,
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "İletişim mesajları yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact message
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { subject, message } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Konu ve mesaj gereklidir" },
        { status: 400 }
      );
    }

    const contactMessage = await db.contactMessage.create({
      data: {
        subject,
        message,
        senderId: user.id
      },
      include: {
        sender: {
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

    return NextResponse.json(contactMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilirken hata oluştu" },
      { status: 500 }
    );
  }
} 