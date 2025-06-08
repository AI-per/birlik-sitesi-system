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
    <ResponsiveContainer width="100%" height={350} data-oid="4nh2spe">
      <BarChart data={data} data-oid="p6otxq6">
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="165ji37"
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₺${value}`}
          data-oid="iuf:gj."
        />

        <Tooltip
          formatter={(value) => [`₺${value}`, ""]}
          labelFormatter={(label) => `${label} 2023`}
          data-oid="1e.mg6:"
        />

        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          name="Toplam Aidat"
          data-oid=".ef9ra5"
        />

        <Bar
          dataKey="collected"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          name="Tahsil Edilen"
          data-oid=":.gnsmo"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
