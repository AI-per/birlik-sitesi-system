"use client";

import { PaymentsList } from "@/components/payments/payments-list";

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ödemeler</h2>
          <p className="text-muted-foreground">
            Ödeme geçmişinizi görüntüleyin ve detaylarını inceleyin.
          </p>
        </div>
      </div>

      <PaymentsList />
    </div>
  );
} 