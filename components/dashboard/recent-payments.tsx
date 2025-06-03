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
    <div className="space-y-8" data-oid="1:03:5w">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center" data-oid="o58o2bg">
          <Avatar className="h-9 w-9" data-oid="2ly9ymn">
            <AvatarImage
              src={payment.user.image || "/placeholder.svg"}
              alt={payment.user.name}
              data-oid="o0bfzms"
            />

            <AvatarFallback data-oid="ghib5l5">
              {payment.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1" data-oid="f-c-3t7">
            <p className="text-sm font-medium leading-none" data-oid="14lcmiw">
              {payment.user.name}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="zf6uy9j">
              {payment.apartment}
            </p>
          </div>
          <div className="ml-auto text-right" data-oid="ryg1b25">
            <p className="text-sm font-medium" data-oid="hs6jvdj">
              {payment.amount}
            </p>
            <div className="text-xs text-muted-foreground" data-oid="92vbza:">
              {payment.date}
            </div>
          </div>
          <div className="ml-2" data-oid="ffs_oux">
            <Badge
              variant={
                payment.status === "success"
                  ? "default"
                  : payment.status === "pending"
                    ? "outline"
                    : "destructive"
              }
              data-oid="wtz8:xf"
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
