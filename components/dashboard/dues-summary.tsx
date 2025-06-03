"use client";

import { Progress } from "@/components/ui/progress";

export function DuesSummary() {
  const duesData = [
    {
      month: "Ocak",
      collected: 16500,
      total: 18000,
      percentage: 92,
    },
    {
      month: "Şubat",
      collected: 17200,
      total: 18000,
      percentage: 96,
    },
    {
      month: "Mart",
      collected: 17800,
      total: 18000,
      percentage: 99,
    },
    {
      month: "Nisan",
      collected: 19000,
      total: 20000,
      percentage: 95,
    },
    {
      month: "Mayıs",
      collected: 18500,
      total: 20000,
      percentage: 93,
    },
  ];

  return (
    <div className="space-y-4">
      {duesData.map((data) => (
        <div key={data.month} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{data.month}</span>
            <span className="text-sm font-medium">
              ₺{data.collected.toLocaleString()} / ₺
              {data.total.toLocaleString()}
            </span>
          </div>
          <Progress value={data.percentage} className="h-2" />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Tahsilat Oranı</span>
            <span>%{data.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
