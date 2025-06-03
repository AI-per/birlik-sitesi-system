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
    <div className="space-y-4" data-oid="ybkf.iq">
      {announcements.map((announcement) => (
        <Card key={announcement.id} data-oid="gk0n:n5">
          <CardContent className="p-4" data-oid="h.xi4se">
            <div
              className="flex items-start justify-between"
              data-oid="ge0stal"
            >
              <div className="space-y-1" data-oid="_7ar2cl">
                <h4 className="text-sm font-medium" data-oid="o6813b-">
                  {announcement.title}
                </h4>
                <p
                  className="text-sm text-muted-foreground line-clamp-2"
                  data-oid="w-fxugq"
                >
                  {announcement.content}
                </p>
              </div>
              <div className="flex items-center" data-oid="a.9_joy">
                <div
                  className="text-xs text-muted-foreground text-right mr-4"
                  data-oid="8y_bi.5"
                >
                  {formatDistanceToNow(announcement.date, {
                    addSuffix: true,
                    locale: tr,
                  })}
                </div>
                <Avatar className="h-8 w-8" data-oid="x.--e-p">
                  <AvatarImage
                    src={announcement.author.image || "/placeholder.svg"}
                    alt={announcement.author.name}
                    data-oid="f18mnlm"
                  />

                  <AvatarFallback data-oid="r:7d.55">
                    {announcement.author.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div
              className="mt-2 flex items-center justify-between"
              data-oid="anw18w4"
            >
              <div className="text-xs text-muted-foreground" data-oid=":qea.-y">
                {announcement.author.name} - {announcement.author.role}
              </div>
              <Button variant="ghost" size="sm" data-oid="mrb4cx8">
                Detaylar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
