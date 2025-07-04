"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Payment {
  id: string;
  amount: number;
  paymentDate: string;
  apartment: string;
  payer: string;
  method: string;
}

interface RecentPaymentsProps {
  data: Payment[];
}

export function RecentPayments({ data }: RecentPaymentsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">
          Henüz ödeme kaydı bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-oid="s6gl1l6">
      {data.map((payment) => (
        <div key={payment.id} className="flex items-center" data-oid="1l2uhct">
          <Avatar className="h-9 w-9" data-oid="dn4a072">
            <AvatarImage
              src=""
              alt={payment.payer}
              data-oid="k17i8x8"
            />

            <AvatarFallback data-oid="n21lt24">
              {getInitials(payment.payer)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1" data-oid="mmowte.">
            <p className="text-sm font-medium leading-none" data-oid="dd5yh2u">
              {payment.payer}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="1unplkz">
              {payment.apartment} • {formatDate(payment.paymentDate)}
            </p>
          </div>
          <div className="ml-auto text-right" data-oid="8i6:2a:">
            <div className="text-sm font-medium" data-oid="ka:q:uj">
              {formatCurrency(payment.amount)}
            </div>
            <p className="text-xs text-muted-foreground" data-oid="vvu5jj9">
              {payment.method}
            </p>
          </div>
          <div className="ml-2" data-oid="oq5esfr">
            <Badge
              variant="default"
              data-oid="l8-q4so"
            >
              Ödendi
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
