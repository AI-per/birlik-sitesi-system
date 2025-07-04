"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface OverviewProps {
  data: Array<{
    name: string;
    total: number;
    collected: number;
    year: number;
    month: number;
  }>;
}

export function Overview({ data }: OverviewProps) {
  // Use provided data or fallback to empty array
  const chartData = data.length > 0 ? data : [
    {
      name: "Veri Yok",
      total: 0,
      collected: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₺${value.toLocaleString()}`}
        />

        <Tooltip
          formatter={(value: number) => [`₺${value.toLocaleString()}`, ""]}
          labelFormatter={(label) => `${label} 2024`}
        />

        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          name="Toplam Aidat"
        />

        <Bar
          dataKey="collected"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          name="Tahsil Edilen"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
