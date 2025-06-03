"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", income: 2000, expenses: 1800 },
  { month: "Feb", income: 2200, expenses: 1900 },
  { month: "Mar", income: 2400, expenses: 2000 },
  { month: "Apr", income: 2600, expenses: 2200 },
  { month: "May", income: 2800, expenses: 2400 },
  { month: "Jun", income: 3000, expenses: 2600 },
];

export function FinancialChart() {
  return (
    <Card data-oid="agyt0dj">
      <CardHeader data-oid="eb6-7_1">
        <CardTitle data-oid="me9l_p1">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="pb-4" data-oid="27ez.7d">
        <div className="h-[200px]" data-oid="fwzfj66">
          <ResponsiveContainer width="100%" height="100%" data-oid="xjnins.">
            <LineChart data={data} data-oid=":g0vzw-">
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                data-oid="ht8om6g"
              />

              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                data-oid="6:jz0m:"
              />

              <Tooltip data-oid="np_m81-" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                strokeWidth={2}
                data-oid="u9h1vyp"
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#82ca9d"
                strokeWidth={2}
                data-oid="f7fftj7"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
