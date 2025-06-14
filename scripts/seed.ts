import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Kullanıcıları kontrol et ve gerekirse oluştur
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log('Creating sample users...');
    
    await prisma.user.createMany({
      data: [
        {
          id: '1be6f3b1-97e7-4910-8b6b-cd03f633b11a',
          fullName: 'Ali Kaya',
          email: 'ali.kaya@example.com',
          phone: '+90 555 123 4567',
          role: 'MANAGER',
          apartmentNumber: 'A-101',
          isActive: true,
        },
        {
          id: '2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b',
          fullName: 'Ayşe Demir',
          email: 'ayse.demir@example.com',
          phone: '+90 555 234 5678',
          role: 'ADMIN',
          apartmentNumber: 'B-205',
          isActive: true,
        },
        {
          id: '3dg8f5d3-b9g9-6b32-ad8d-ef15g855d33c',
          fullName: 'Mehmet Yılmaz',
          email: 'mehmet.yilmaz@example.com',
          phone: '+90 555 345 6789',
          role: 'RESIDENT',
          apartmentNumber: 'C-302',
          isActive: true,
        },
      ],
    });
    
    console.log('✅ Sample users created');
  }

  // Duyuruları kontrol et ve gerekirse oluştur
  const announcements = await prisma.announcement.findMany();
  
  if (announcements.length === 0) {
    console.log('Creating sample announcements...');
    
    await prisma.announcement.createMany({
      data: [
        {
          title: 'Site Yönetim Toplantısı',
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
          authorId: '1be6f3b1-97e7-4910-8b6b-cd03f633b11a',
        },
        {
          title: 'Su Kesintisi Duyurusu',
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
          authorId: '2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b',
        },
        {
          title: 'Yeni Güvenlik Sistemi',
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
          authorId: '1be6f3b1-97e7-4910-8b6b-cd03f633b11a',
        },
        {
          title: 'Otopark Düzenlemesi',
          content: `Sayın site sakinleri,

Otopark alanında yaşanan sorunları çözmek için yeni düzenlemeler yapılmıştır:

• Her daireye 1 araç park yeri tahsis edilmiştir
• Park yerleri numaralandırılmıştır
• Misafir park alanı belirlenmiştir
• Park kuralları güncellenmiştir

Yeni düzenleme 25 Ocak 2024 tarihinden itibaren geçerli olacaktır. Park yeri numaranızı öğrenmek için yönetim ile iletişime geçiniz.

Site Yönetimi`,
          isPublished: true,
          authorId: '2cf7e4c2-a8f8-5a21-9c7c-de04f744c22b',
        },
        {
          title: 'Bahçe Düzenleme Çalışmaları',
          content: `Sayın site sakinleri,

Bahar aylarının gelmesiyle birlikte site bahçesinde düzenleme çalışmaları başlayacaktır.

Yapılacak çalışmalar:
• Çim ekimi ve peyzaj düzenlemesi
• Çiçek tarhları oluşturulması
• Oturma alanları yapılması
• Çocuk oyun alanı yenilenmesi
• Yürüyüş yolu döşenmesi

Çalışmalar yaklaşık 2 hafta sürecektir. Bu süre zarfında bahçe alanında dikkatli olunması rica olunur.

Site Yönetimi`,
          isPublished: false,
          authorId: '1be6f3b1-97e7-4910-8b6b-cd03f633b11a',
        },
      ],
    });
    
    console.log('✅ Sample announcements created');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 