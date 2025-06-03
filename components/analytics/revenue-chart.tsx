"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

const data = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 2200 },
  { month: "Mar", revenue: 2700 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 2800 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3100 },
  { month: "Aug", revenue: 3400 },
  { month: "Sep", revenue: 3700 },
  { month: "Oct", revenue: 3500 },
  { month: "Nov", revenue: 3800 },
  { month: "Dec", revenue: 4200 },
];

export function RevenueChart() {
  const { theme } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-none shadow-lg" data-oid="21dpm8y">
          <CardContent className="p-2" data-oid="rr2agb9">
            <p className="text-sm font-semibold" data-oid="43xdg.r">
              {label}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="9doextf">
              Revenue: ${payload[0].value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350} data-oid=".k::ytl">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        data-oid="2mes6b_"
      >
        <XAxis
          dataKey="month"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          data-oid="x-x13f6"
        />

        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          data-oid="hqgentg"
        />

        <Tooltip
          content={<CustomTooltip data-oid="ykjuag6" />}
          data-oid=":v04qxo"
        />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          strokeWidth={2}
          dot={false}
          data-oid="92w7pu2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
