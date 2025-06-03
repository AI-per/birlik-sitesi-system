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
    <ResponsiveContainer width="100%" height={350} data-oid="tnzk25t">
      <BarChart data={data} data-oid="005:k:4">
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="jyuelqn"
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₺${value}`}
          data-oid="k9cdagn"
        />

        <Tooltip
          formatter={(value) => [`₺${value}`, ""]}
          labelFormatter={(label) => `${label} 2023`}
          data-oid="w1jubrc"
        />

        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          name="Toplam Aidat"
          data-oid="j-_k.-l"
        />

        <Bar
          dataKey="collected"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          name="Tahsil Edilen"
          data-oid="6q_vh5s"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
