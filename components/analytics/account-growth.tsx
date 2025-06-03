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
        <Card className="border-none shadow-lg" data-oid="3x9drbb">
          <CardContent className="p-2" data-oid="v7azbzw">
            <p className="text-sm font-semibold" data-oid=":rn5w3w">
              {label}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="xh.1hok">
              New Accounts: {payload[0].value}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="qzqkd4j">
              Total Accounts: {payload[1].value}
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350} data-oid="a4jz791">
      <BarChart data={data} data-oid="hh4l-vm">
        <XAxis
          dataKey="month"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="nyco181"
        />

        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid=".-u-zn6"
        />

        <Tooltip
          content={<CustomTooltip data-oid="6ce04lx" />}
          data-oid="4k9rb0a"
        />

        <Bar
          dataKey="newAccounts"
          fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          radius={[4, 4, 0, 0]}
          data-oid="vw_vvei"
        />

        <Bar
          dataKey="totalAccounts"
          fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
          radius={[4, 4, 0, 0]}
          data-oid="s.1j2nq"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
