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
    <Card data-oid="asb2d:g">
      <CardHeader data-oid="r5zsf7-">
        <CardTitle data-oid="5-m8.ya">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="pb-4" data-oid="7797f5m">
        <div className="h-[200px]" data-oid="kxll-n2">
          <ResponsiveContainer width="100%" height="100%" data-oid="5fipqli">
            <LineChart data={data} data-oid="szf4fb5">
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                data-oid="_x_:9fl"
              />

              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                data-oid="tg04fl_"
              />

              <Tooltip data-oid="lg3lou0" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                strokeWidth={2}
                data-oid="fy4qj4h"
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#82ca9d"
                strokeWidth={2}
                data-oid="j-3wm81"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
