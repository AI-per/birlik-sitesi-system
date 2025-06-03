"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Oca",
    total: 18000,
    collected: 16500,
  },
  {
    name: "Şub",
    total: 18000,
    collected: 17200,
  },
  {
    name: "Mar",
    total: 18000,
    collected: 17800,
  },
  {
    name: "Nis",
    total: 20000,
    collected: 19000,
  },
  {
    name: "May",
    total: 20000,
    collected: 18500,
  },
  {
    name: "Haz",
    total: 20000,
    collected: 17000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
          tickFormatter={(value) => `₺${value}`}
        />

        <Tooltip
          formatter={(value) => [`₺${value}`, ""]}
          labelFormatter={(label) => `${label} 2023`}
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
