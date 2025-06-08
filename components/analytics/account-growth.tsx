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
        <Card className="border-none shadow-lg" data-oid="tzyb1yi">
          <CardContent className="p-2" data-oid="rn:ysa5">
            <p className="text-sm font-semibold" data-oid="5z_cdbi">
              {label}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="s9512ey">
              New Accounts: {payload[0].value}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="jy3d14o">
              Total Accounts: {payload[1].value}
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350} data-oid="22t-4i8">
      <BarChart data={data} data-oid="rqmzt5v">
        <XAxis
          dataKey="month"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="ib71ghc"
        />

        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="w817bv7"
        />

        <Tooltip
          content={<CustomTooltip data-oid="5zfgaf2" />}
          data-oid="rx8q5n0"
        />

        <Bar
          dataKey="newAccounts"
          fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          radius={[4, 4, 0, 0]}
          data-oid="oahq2rf"
        />

        <Bar
          dataKey="totalAccounts"
          fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
          radius={[4, 4, 0, 0]}
          data-oid="o-0mmjz"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
