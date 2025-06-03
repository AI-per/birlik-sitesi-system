"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

const data = [
  { month: "Jan", newAccounts: 100, totalAccounts: 1000 },
  { month: "Feb", newAccounts: 120, totalAccounts: 1120 },
  { month: "Mar", newAccounts: 150, totalAccounts: 1270 },
  { month: "Apr", newAccounts: 180, totalAccounts: 1450 },
  { month: "May", newAccounts: 200, totalAccounts: 1650 },
  { month: "Jun", newAccounts: 220, totalAccounts: 1870 },
];

export function AccountGrowth() {
  const { theme } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-none shadow-lg" data-oid="n_28_e7">
          <CardContent className="p-2" data-oid="r69hjo3">
            <p className="text-sm font-semibold" data-oid="xk0ibjy">
              {label}
            </p>
            <p className="text-sm text-muted-foreground" data-oid=".npo27x">
              New Accounts: {payload[0].value}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="vrerqwh">
              Total Accounts: {payload[1].value}
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350} data-oid="ovcebmq">
      <BarChart data={data} data-oid="3488lcp">
        <XAxis
          dataKey="month"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="tvi-80l"
        />

        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="qtcz0ph"
        />

        <Tooltip
          content={<CustomTooltip data-oid="mc9g74t" />}
          data-oid="s0w1hvu"
        />

        <Bar
          dataKey="newAccounts"
          fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          radius={[4, 4, 0, 0]}
          data-oid="j4cq6t7"
        />

        <Bar
          dataKey="totalAccounts"
          fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
          radius={[4, 4, 0, 0]}
          data-oid="we77p13"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
