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
    <div className="space-y-8">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={payment.user.image || "/placeholder.svg"}
              alt={payment.user.name}
            />

            <AvatarFallback>{payment.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {payment.user.name}
            </p>
            <p className="text-sm text-muted-foreground">{payment.apartment}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{payment.amount}</p>
            <div className="text-xs text-muted-foreground">{payment.date}</div>
          </div>
          <div className="ml-2">
            <Badge
              variant={
                payment.status === "success"
                  ? "default"
                  : payment.status === "pending"
                    ? "outline"
                    : "destructive"
              }
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
