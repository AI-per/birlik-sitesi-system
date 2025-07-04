import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/announcements/[id] - Tekil duyuru getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const announcement = await db.announcement.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
        attachments: true,
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    // Format dates for frontend
    const formattedAnnouncement = {
      ...announcement,
      createdAt: formatDate(new Date(announcement.createdAt)),
      updatedAt: formatDate(new Date(announcement.updatedAt)),
    };

    return NextResponse.json(formattedAnnouncement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json(
      { error: "Duyuru yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/announcements/[id] - Duyuru güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, isPublished, currentUserId, currentUserRole } = body;

    // Duyuru kontrolü
    const announcement = await db.announcement.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    // Yetki kontrolü - sadece yazar veya ADMIN düzenleyebilir
    if (announcement.authorId !== currentUserId && currentUserRole !== 'ADMIN') {
      return NextResponse.json(
        { error: "Bu duyuruyu düzenleme yetkiniz bulunmamaktadır" },
        { status: 403 }
      );
    }

    // Validasyon
    if (!title || !content) {
      return NextResponse.json(
        { error: "Başlık ve içerik gereklidir" },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: "Başlık 200 karakterden uzun olamaz" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: "İçerik 5000 karakterden uzun olamaz" },
        { status: 400 }
      );
    }

    // Duyuru güncelle
    const updatedAnnouncement = await db.announcement.update({
      where: { id },
      data: {
      title: title.trim(),
      content: content.trim(),
      isPublished: isPublished ?? announcement.isPublished,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
        attachments: true,
      },
    });

    // Format dates for frontend
    const formattedAnnouncement = {
      ...updatedAnnouncement,
      createdAt: formatDate(new Date(updatedAnnouncement.createdAt)),
      updatedAt: formatDate(new Date(updatedAnnouncement.updatedAt)),
    };

    return NextResponse.json(formattedAnnouncement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: "Duyuru güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/announcements/[id] - Duyuru sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const currentUserId = searchParams.get('currentUserId');
    const currentUserRole = searchParams.get('currentUserRole');

    // Duyuru kontrolü
    const announcement = await db.announcement.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    // Yetki kontrolü - sadece yazar veya ADMIN silebilir
    if (announcement.authorId !== currentUserId && currentUserRole !== 'ADMIN') {
      return NextResponse.json(
        { error: "Bu duyuruyu silme yetkiniz bulunmamaktadır" },
        { status: 403 }
      );
    }

    // Duyuru sil (attachments da cascade olarak silinecek)
    await db.announcement.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Duyuru başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Duyuru silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 