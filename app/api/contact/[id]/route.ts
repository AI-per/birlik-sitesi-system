import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/contact/[id] - Get single contact message
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const message = await db.contactMessage.findUnique({
      where: { id },
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

    if (!message) {
      return NextResponse.json(
        { error: "Mesaj bulunamadı" },
        { status: 404 }
      );
    }

    // Authorization check - users can only see their own messages unless they're admin/manager
    if (user.role !== 'ADMIN' && user.role !== 'MANAGER' && message.senderId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return NextResponse.json(
      { error: "Mesaj yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/contact/[id] - Update contact message (admin only - mainly for marking as read)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only admins and managers can update contact messages
    if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();
    const { isRead } = body;

    const message = await db.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      return NextResponse.json(
        { error: "Mesaj bulunamadı" },
        { status: 404 }
      );
    }

    const updatedMessage = await db.contactMessage.update({
      where: { id },
      data: {
        isRead: isRead !== undefined ? isRead : message.isRead
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

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("Error updating contact message:", error);
    return NextResponse.json(
      { error: "Mesaj güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
} 