import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// Mock data for testing
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

// GET /api/announcements - Tüm duyuruları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublished = searchParams.get('isPublished');
    const authorId = searchParams.get('authorId');

    let filteredAnnouncements = [...mockAnnouncements];
    
    if (isPublished !== null) {
      const publishedFilter = isPublished === 'true';
      filteredAnnouncements = filteredAnnouncements.filter(
        announcement => announcement.isPublished === publishedFilter
      );
    }
    
    if (authorId) {
      filteredAnnouncements = filteredAnnouncements.filter(
        announcement => announcement.authorId === authorId
      );
    }

    // Tarihe göre sırala (en yeni önce)
    filteredAnnouncements.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(filteredAnnouncements);
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
    const { title, content, isPublished, authorId } = body;

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

    // Yazar kontrolü
    const author = mockUsers.find(user => user.id === authorId);

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

    // Yeni duyuru oluştur
    const newAnnouncement = {
      id: (mockAnnouncements.length + 1).toString(),
      title: title.trim(),
      content: content.trim(),
      isPublished: isPublished ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId,
      attachments: [] as any[],
      author: {
        id: author.id,
        fullName: author.fullName,
        role: author.role,
      },
    };

    // Mock data'ya ekle (gerçek uygulamada veritabanına kaydedilir)
    mockAnnouncements.unshift(newAnnouncement);

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Duyuru oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
} 