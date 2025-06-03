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
    <div className="space-y-4" data-oid="lxbzy-c">
      {duesData.map((data) => (
        <div key={data.month} className="space-y-2" data-oid="uvoeaz0">
          <div className="flex items-center justify-between" data-oid="5w86l2h">
            <span className="text-sm font-medium" data-oid="j-5k36i">
              {data.month}
            </span>
            <span className="text-sm font-medium" data-oid="-hbta8g">
              ₺{data.collected.toLocaleString()} / ₺
              {data.total.toLocaleString()}
            </span>
          </div>
          <Progress
            value={data.percentage}
            className="h-2"
            data-oid="9lqr5uq"
          />

          <div
            className="flex items-center justify-between text-xs text-muted-foreground"
            data-oid="v71l.nq"
          >
            <span data-oid="te7clj0">Tahsilat Oranı</span>
            <span data-oid="8jy71o.">%{data.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
