"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

export function ManagementInfo() {
  const contactInfo = [
    {
      title: "Site Yöneticisi",
      name: "Ahmet Özkan",
      phone: "+90 (212) 555-0101",
      email: "yonetici@birliksitesi.com",
      availableHours: "Pazartesi - Cuma: 09:00 - 17:00",
      emergency: true
    },
    {
      title: "Muhasebe",
      name: "Fatma Demir",
      phone: "+90 (212) 555-0102",
      email: "muhasebe@birliksitesi.com",
      availableHours: "Pazartesi - Cuma: 09:00 - 16:00",
      emergency: false
    },
    {
      title: "Teknik Ekip",
      name: "Mehmet Yılmaz",
      phone: "+90 (212) 555-0103",
      email: "teknik@birliksitesi.com",
      availableHours: "7/24 Acil Arızalar",
      emergency: true
    },
    {
      title: "Güvenlik",
      name: "Kapıcı Merkezi",
      phone: "+90 (212) 555-0104",
      email: "guvenlik@birliksitesi.com",
      availableHours: "7/24",
      emergency: true
    }
  ];

  const emergencyNumbers = [
    { name: "İtfaiye", number: "110" },
    { name: "Polis", number: "155" },
    { name: "Ambulans", number: "112" },
    { name: "Doğalgaz Acil", number: "187" },
    { name: "Elektrik Arıza", number: "186" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Yönetim İletişim Bilgileri
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            İhtiyacınıza göre doğru kişi ile iletişime geçin.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                {contact.emergency && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 text-xs"
                  >
                    Acil
                  </Badge>
                )}
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground">{contact.name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icons.user className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-sm hover:underline text-primary"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icons.message className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm hover:underline text-primary"
                      >
                        {contact.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icons.clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {contact.availableHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Site Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.building className="h-5 w-5" />
            Site Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold">Adres</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Birlik Sitesi</p>
                <p>Atatürk Mahallesi, Cumhuriyet Caddesi No: 123</p>
                <p>34100 Şişli/İstanbul</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Yönetim Ofisi</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📍 A Blok Zemin Kat</p>
                <p>🕒 Pazartesi - Cuma: 09:00 - 17:00</p>
                <p>🕒 Cumartesi: 09:00 - 12:00</p>
                <p>🕒 Pazar: Kapalı</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Numbers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.alertTriangle className="h-5 w-5 text-red-500" />
            Acil Durum Numaraları
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Acil durumlar için gerekli telefon numaraları.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {emergencyNumbers.map((emergency, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
              >
                <div className="text-center w-full">
                  <div className="font-semibold text-sm text-red-800">
                    {emergency.name}
                  </div>
                  <a
                    href={`tel:${emergency.number}`}
                    className="text-lg font-bold text-red-600 hover:underline"
                  >
                    {emergency.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Office Hours Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icons.clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-blue-900">Mesai Saatleri Hakkında</h3>
              <p className="text-sm text-blue-800">
                Acil olmayan konular için lütfen mesai saatleri içinde iletişime geçin. 
                Acil durumlar için 7/24 ulaşabileceğiniz numaraları kullanın.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 