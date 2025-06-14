import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// Mock data (same as in the main route)
const mockAnnouncements = [
  {
    id: "1",
    title: "Site Yönetim Toplantısı",
    content: `Sayın site sakinleri,

Aylık site yönetim toplantımız 15 Ocak 2024 Pazartesi günü saat 19:00'da site toplantı salonunda yapılacaktır.

Gündem maddeleri:
• Aylık gider raporu
• Asansör bakım durumu
• Güvenlik kamerası sistemi güncellemesi
• Bahçe düzenleme çalışmaları
• Diğer konular

Tüm site sakinlerinin katılımı önemlidir. Katılamayacak olanların vekil göndermesi rica olunur.

Saygılarımızla,
Site Yönetimi`,
    isPublished: true,
    createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-10T10:00:00Z').toISOString(),
    authorId: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
    attachments: [] as any[],
    author: {
      id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
      fullName: "Ali Kaya",
      role: "MANAGER",
    },
  },
  {
    id: "2",
    title: "Su Kesintisi Duyurusu",
    content: `Sayın site sakinleri,

İSKİ tarafından yapılacak altyapı çalışmaları nedeniyle 20 Ocak 2024 Cumartesi günü saat 09:00-17:00 arası sitemizde su kesintisi yaşanacaktır.

Bu süre zarfında:
• Su deposu temizliği yapılacaktır
• Ana su hattı yenilenecektir
• Pompa sistemi kontrol edilecektir

Kesinti süresince su ihtiyacınızı karşılamak için önceden tedbir almanızı rica ederiz.

Yaşanacak mağduriyet için şimdiden özür dileriz.

Site Yönetimi`,
    isPublished: true,
    createdAt: new Date('2024-01-08T14:30:00Z').toISOString(),
    updatedAt: new Date('2024-01-08T14:30:00Z').toISOString(),
    authorId: "2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b",
    attachments: [] as any[],
    author: {
      id: "2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b",
      fullName: "Ayşe Demir",
      role: "ADMIN",
    },
  },
  {
    id: "3",
    title: "Yeni Güvenlik Sistemi",
    content: `Sayın site sakinleri,

Site güvenliğini artırmak amacıyla yeni güvenlik sistemi kurulumu tamamlanmıştır.

Yeni sistem özellikleri:
• 24 saat kayıt yapan HD kameralar
• Gece görüş özelliği
• Hareket algılama sistemi
• Mobil uygulama ile uzaktan izleme

Sistem 1 Şubat 2024 tarihinden itibaren aktif olacaktır. Detaylı bilgi için yönetim ile iletişime geçebilirsiniz.

Site Yönetimi`,
    isPublished: false,
    createdAt: new Date('2024-01-05T09:15:00Z').toISOString(),
    updatedAt: new Date('2024-01-05T09:15:00Z').toISOString(),
    authorId: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
    attachments: [] as any[],
    author: {
      id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
      fullName: "Ali Kaya",
      role: "MANAGER",
    },
  },
];

const mockUsers = [
  {
    id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
    fullName: "Ali Kaya",
    role: "MANAGER",
  },
  {
    id: "2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b",
    fullName: "Ayşe Demir",
    role: "ADMIN",
  },
];

// GET /api/announcements/[id] - Tekil duyuru getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const announcement = mockAnnouncements.find(a => a.id === id);

    if (!announcement) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(announcement);
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, isPublished, currentUserId, currentUserRole, attachments, existingAttachments } = body;

    // Duyuru kontrolü
    const announcementIndex = mockAnnouncements.findIndex(a => a.id === id);
    if (announcementIndex === -1) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    const announcement = mockAnnouncements[announcementIndex];

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
    const updatedAnnouncement = {
      ...announcement,
      title: title.trim(),
      content: content.trim(),
      isPublished: isPublished ?? announcement.isPublished,
      updatedAt: new Date().toISOString(),
      // Mevcut ekleri koru ve yeni ekleri ekle
      attachments: [
        ...(existingAttachments || []),
        ...(attachments || [])
      ],
    };

    mockAnnouncements[announcementIndex] = updatedAnnouncement;

    return NextResponse.json(updatedAnnouncement);
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const currentUserId = searchParams.get('currentUserId');
    const currentUserRole = searchParams.get('currentUserRole');

    // Duyuru kontrolü
    const announcementIndex = mockAnnouncements.findIndex(a => a.id === id);
    if (announcementIndex === -1) {
      return NextResponse.json(
        { error: "Duyuru bulunamadı" },
        { status: 404 }
      );
    }

    const announcement = mockAnnouncements[announcementIndex];

    // Yetki kontrolü - sadece yazar veya ADMIN silebilir
    if (announcement.authorId !== currentUserId && currentUserRole !== 'ADMIN') {
      return NextResponse.json(
        { error: "Bu duyuruyu silme yetkiniz bulunmamaktadır" },
        { status: 403 }
      );
    }

    // Duyuru sil
    mockAnnouncements.splice(announcementIndex, 1);

    return NextResponse.json({ message: "Duyuru başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Duyuru silinirken hata oluştu" },
      { status: 500 }
    );
  }
} 