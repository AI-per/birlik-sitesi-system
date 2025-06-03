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
    <div className="space-y-4" data-oid="f3mx4sp">
      {duesData.map((data) => (
        <div key={data.month} className="space-y-2" data-oid="a69jq6w">
          <div className="flex items-center justify-between" data-oid="u3z_ccm">
            <span className="text-sm font-medium" data-oid="ih63-.l">
              {data.month}
            </span>
            <span className="text-sm font-medium" data-oid="66ia5eu">
              ₺{data.collected.toLocaleString()} / ₺
              {data.total.toLocaleString()}
            </span>
          </div>
          <Progress
            value={data.percentage}
            className="h-2"
            data-oid="iwl9-fi"
          />

          <div
            className="flex items-center justify-between text-xs text-muted-foreground"
            data-oid="eaze5a8"
          >
            <span data-oid="ujlivw8">Tahsilat Oranı</span>
            <span data-oid="5saj-8f">%{data.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
