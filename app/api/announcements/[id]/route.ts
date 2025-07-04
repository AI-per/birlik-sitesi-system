import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    // Transform attachment data for frontend (keep raw dates)
    const transformedAnnouncement = {
      ...announcement,
      createdAt: announcement.createdAt.toISOString(),
      updatedAt: announcement.updatedAt.toISOString(),
      attachments: announcement.attachments.map(attachment => ({
        ...attachment,
        url: attachment.filePath, // Transform filePath to url for frontend
        mimeType: attachment.fileType, // Transform fileType to mimeType for frontend
      })),
    };

    return NextResponse.json(transformedAnnouncement);
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
    const { 
      title, 
      content, 
      isPublished, 
      currentUserId, 
      currentUserRole,
      attachments, // Yeni yüklenen dosyalar
      existingAttachments // Korunacak mevcut dosyalar
    } = body;

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
        attachments: true,
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    // Yetki kontrolü - sadece yazar veya ADMIN güncelleyebilir
    if (announcement.authorId !== currentUserId && currentUserRole !== 'ADMIN') {
      return NextResponse.json(
        { error: "Bu duyuruyu güncelleme yetkiniz bulunmamaktadır" },
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

    // Mevcut ekleri silme ve yeni ekleri ekleme işlemi
    const updatedAnnouncement = await db.$transaction(async (prisma) => {
      // Önce mevcut tüm ekleri sil
      await prisma.announcementAttachment.deleteMany({
        where: { announcementId: id },
      });

      // Duyuruyu güncelle
      const updated = await prisma.announcement.update({
        where: { id },
        data: {
          title: title.trim(),
          content: content.trim(),
          isPublished: isPublished ?? true,
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

      // Korunacak mevcut ekleri geri ekle
      if (existingAttachments && existingAttachments.length > 0) {
        await prisma.announcementAttachment.createMany({
          data: existingAttachments.map((attachment: any) => ({
            announcementId: id,
            originalName: attachment.originalName,
            fileName: attachment.fileName,
            filePath: attachment.filePath || attachment.url, // url alanı filePath olarak kullanılabilir
            fileSize: attachment.fileSize,
            fileType: attachment.fileType || attachment.mimeType,
          })),
        });
      }

      // Yeni yüklenen dosyaları ekle
      if (attachments && attachments.length > 0) {
        await prisma.announcementAttachment.createMany({
          data: attachments.map((file: any) => ({
            announcementId: id,
            originalName: file.originalName,
            fileName: file.fileName,
            filePath: file.filePath,
            fileSize: file.fileSize,
            fileType: file.fileType,
          })),
        });
      }

      // Güncellenmiş duyuruyu ekleriyle birlikte getir
      return await prisma.announcement.findUnique({
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
    });

    if (!updatedAnnouncement) {
      return NextResponse.json(
        { error: "Duyuru güncellenirken hata oluştu" },
        { status: 500 }
      );
    }

    // Transform dates and attachment URLs for frontend (keep raw dates)
    const transformedAnnouncement = {
      ...updatedAnnouncement,
      createdAt: updatedAnnouncement.createdAt.toISOString(),
      updatedAt: updatedAnnouncement.updatedAt.toISOString(),
      attachments: updatedAnnouncement.attachments.map(attachment => ({
        ...attachment,
        url: attachment.filePath, // Transform filePath to url for frontend
        mimeType: attachment.fileType, // Transform fileType to mimeType for frontend
      })),
    };

    return NextResponse.json({
      message: "Duyuru başarıyla güncellendi",
      announcement: transformedAnnouncement,
    });
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