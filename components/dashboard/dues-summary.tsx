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
    <div className="space-y-4" data-oid="bkk6g_k">
      {duesData.map((data) => (
        <div key={data.month} className="space-y-2" data-oid="7rsc5d-">
          <div className="flex items-center justify-between" data-oid="qx:fqk.">
            <span className="text-sm font-medium" data-oid="fqww65q">
              {data.month}
            </span>
            <span className="text-sm font-medium" data-oid="q56e84:">
              ₺{data.collected.toLocaleString()} / ₺
              {data.total.toLocaleString()}
            </span>
          </div>
          <Progress
            value={data.percentage}
            className="h-2"
            data-oid="s9o04ru"
          />

          <div
            className="flex items-center justify-between text-xs text-muted-foreground"
            data-oid="0e4lf_0"
          >
            <span data-oid="m7pmd3n">Tahsilat Oranı</span>
            <span data-oid="2oz--j:">%{data.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
