"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentPayments() {
  const payments = [
    {
      id: "1",
      amount: "₺350",
      status: "success",
      email: "m.yilmaz@example.com",
      user: {
        name: "Mehmet Yılmaz",
        image: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-05-20",
      apartment: "A-101",
    },
    {
      id: "2",
      amount: "₺250",
      status: "success",
      email: "a.demir@example.com",
      user: {
        name: "Ayşe Demir",
        image: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-05-19",
      apartment: "B-205",
    },
    {
      id: "3",
      amount: "₺350",
      status: "pending",
      email: "c.kaya@example.com",
      user: {
        name: "Can Kaya",
        image: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-05-18",
      apartment: "C-302",
    },
    {
      id: "4",
      amount: "₺450",
      status: "success",
      email: "e.yildiz@example.com",
      user: {
        name: "Elif Yıldız",
        image: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-05-17",
      apartment: "A-404",
    },
    {
      id: "5",
      amount: "₺350",
      status: "failed",
      email: "b.celik@example.com",
      user: {
        name: "Burak Çelik",
        image: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-05-16",
      apartment: "B-103",
    },
  ];

  return (
    <div className="space-y-8" data-oid="s6gl1l6">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center" data-oid="1l2uhct">
          <Avatar className="h-9 w-9" data-oid="dn4a072">
            <AvatarImage
              src={payment.user.image || "/placeholder.svg"}
              alt={payment.user.name}
              data-oid="k17i8x8"
            />

            <AvatarFallback data-oid="n21lt24">
              {payment.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1" data-oid="mmowte.">
            <p className="text-sm font-medium leading-none" data-oid="dd5yh2u">
              {payment.user.name}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="1unplkz">
              {payment.apartment}
            </p>
          </div>
          <div className="ml-auto text-right" data-oid="8i6:2a:">
            <p className="text-sm font-medium" data-oid="ka:q:uj">
              {payment.amount}
            </p>
            <div className="text-xs text-muted-foreground" data-oid="vvu5jj9">
              {payment.date}
            </div>
          </div>
          <div className="ml-2" data-oid="oq5esfr">
            <Badge
              variant={
                payment.status === "success"
                  ? "default"
                  : payment.status === "pending"
                    ? "outline"
                    : "destructive"
              }
              data-oid="l8-q4so"
            >
              {payment.status === "success"
                ? "Ödendi"
                : payment.status === "pending"
                  ? "Beklemede"
                  : "Başarısız"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
