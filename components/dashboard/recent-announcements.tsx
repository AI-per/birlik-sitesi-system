"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export function RecentAnnouncements() {
  const announcements = [
    {
      id: "1",
      title: "Bahçe Düzenlemesi",
      content:
        "Önümüzdeki hafta site bahçesinde peyzaj çalışması yapılacaktır. Çalışma sırasında bahçe kullanıma kapalı olacaktır.",
      date: new Date("2023-05-20T10:00:00"),
      author: {
        name: "Ali Yılmaz",
        role: "Site Yöneticisi",
        image: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      title: "Su Kesintisi",
      content:
        "Yarın 10:00-14:00 saatleri arasında bakım çalışması nedeniyle su kesintisi yaşanacaktır.",
      date: new Date("2023-05-19T15:30:00"),
      author: {
        name: "Mehmet Demir",
        role: "Teknik Sorumlu",
        image: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      title: "Yıllık Site Toplantısı",
      content:
        "Yıllık site toplantımız 15 Haziran Cumartesi günü saat 14:00'te site toplantı salonunda gerçekleştirilecektir. Tüm site sakinlerinin katılımı önemle rica olunur.",
      date: new Date("2023-05-18T09:15:00"),
      author: {
        name: "Ali Yılmaz",
        role: "Site Yöneticisi",
        image: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      title: "Yeni Güvenlik Sistemi",
      content:
        "Sitemizde yeni güvenlik kamera sistemi kurulumu tamamlanmıştır. Detaylı bilgi için yönetim ofisine başvurabilirsiniz.",
      date: new Date("2023-05-17T11:45:00"),
      author: {
        name: "Ayşe Kaya",
        role: "Güvenlik Sorumlusu",
        image: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "5",
      title: "Havuz Açılışı",
      content:
        "Site havuzumuz 1 Haziran itibariyle hizmete açılacaktır. Havuz kullanım kurallarını lütfen dikkatlice okuyunuz.",
      date: new Date("2023-05-16T14:20:00"),
      author: {
        name: "Ali Yılmaz",
        role: "Site Yöneticisi",
        image: "/placeholder.svg?height=32&width=32",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{announcement.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {announcement.content}
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-xs text-muted-foreground text-right mr-4">
                  {formatDistanceToNow(announcement.date, {
                    addSuffix: true,
                    locale: tr,
                  })}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={announcement.author.image || "/placeholder.svg"}
                    alt={announcement.author.name}
                  />

                  <AvatarFallback>{announcement.author.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {announcement.author.name} - {announcement.author.role}
              </div>
              <Button variant="ghost" size="sm">
                Detaylar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
