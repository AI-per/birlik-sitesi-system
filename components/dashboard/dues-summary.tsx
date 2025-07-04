"use client";

import { Progress } from "@/components/ui/progress";

interface DuesSummaryData {
  month: string;
  collected: number;
  total: number;
  percentage: number;
}

interface DuesSummaryProps {
  data: DuesSummaryData[];
}

export function DuesSummary({ data }: DuesSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">
          Aidat verisi bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((dueData, index) => (
        <div key={`${dueData.month}-${index}`} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {dueData.month}
            </span>
            <span className="text-sm font-medium">
              {formatCurrency(dueData.collected)} / {formatCurrency(dueData.total)}
            </span>
          </div>
          <Progress
            value={dueData.percentage}
            className="h-2"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Tahsilat Oranı</span>
            <span>%{dueData.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
