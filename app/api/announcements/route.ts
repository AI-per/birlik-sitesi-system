import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// GET /api/announcements - Tüm duyuruları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublished = searchParams.get('isPublished');
    const authorId = searchParams.get('authorId');

    // Build where clause for filtering
    const where: any = {};
    
    if (isPublished !== null) {
      where.isPublished = isPublished === 'true';
    }
    
    if (authorId) {
      where.authorId = authorId;
    }

    const announcements = await db.announcement.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format dates and attachment URLs for frontend
    const formattedAnnouncements = announcements.map(announcement => ({
      ...announcement,
      createdAt: formatDate(new Date(announcement.createdAt)),
      updatedAt: formatDate(new Date(announcement.updatedAt)),
      attachments: announcement.attachments.map(attachment => ({
        ...attachment,
        url: attachment.filePath, // Transform filePath to url for frontend
        mimeType: attachment.fileType, // Transform fileType to mimeType for frontend
      })),
    }));

    return NextResponse.json(formattedAnnouncements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Duyurular yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/announcements - Yeni duyuru oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, isPublished, authorId, attachments } = body;

    // Validasyon
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Başlık, içerik ve yazar bilgisi gereklidir" },
        { status: 400 }
      );
    }

    // Başlık uzunluk kontrolü
    if (title.length > 200) {
      return NextResponse.json(
        { error: "Başlık 200 karakterden uzun olamaz" },
        { status: 400 }
      );
    }

    // İçerik uzunluk kontrolü
    if (content.length > 5000) {
      return NextResponse.json(
        { error: "İçerik 5000 karakterden uzun olamaz" },
        { status: 400 }
      );
    }

    // Yazar kontrolü ve yetki kontrolü
    const author = await db.user.findUnique({
      where: { id: authorId },
      select: {
        id: true,
        fullName: true,
        role: true,
      },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Yazar bulunamadı" },
        { status: 400 }
      );
    }

    // Sadece MANAGER ve ADMIN rolleri duyuru oluşturabilir
    if (author.role !== 'MANAGER' && author.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Duyuru oluşturma yetkiniz bulunmamaktadır" },
        { status: 403 }
      );
    }

    // Yeni duyuru oluştur (attachments dahil)
    const newAnnouncement = await db.announcement.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        isPublished: isPublished ?? true,
        authorId,
        // Eğer attachments varsa, aynı transaction içinde oluştur
        attachments: attachments && attachments.length > 0 ? {
          createMany: {
            data: attachments.map((file: any) => ({
              originalName: file.originalName,
              fileName: file.fileName,
              filePath: file.filePath,
              fileSize: file.fileSize,
              fileType: file.fileType,
            })),
          },
        } : undefined,
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

    // Format dates and attachment URLs for frontend
    const formattedAnnouncement = {
      ...newAnnouncement,
      createdAt: formatDate(new Date(newAnnouncement.createdAt)),
      updatedAt: formatDate(new Date(newAnnouncement.updatedAt)),
      attachments: newAnnouncement.attachments.map(attachment => ({
        ...attachment,
        url: attachment.filePath, // Transform filePath to url for frontend
        mimeType: attachment.fileType, // Transform fileType to mimeType for frontend
      })),
    };

    return NextResponse.json({
      message: "Duyuru başarıyla oluşturuldu",
      announcement: formattedAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Duyuru oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 