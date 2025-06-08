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
    <Card data-oid="nyq_0mm">
      <CardHeader data-oid="tbw3z8k">
        <CardTitle data-oid="k41g5w3">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="pb-4" data-oid="msphblk">
        <div className="h-[200px]" data-oid="b9qphfo">
          <ResponsiveContainer width="100%" height="100%" data-oid="3nf_g1f">
            <LineChart data={data} data-oid="zbeea0o">
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                data-oid="749n13e"
              />

              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                data-oid="txzkywf"
              />

              <Tooltip data-oid="1u187e9" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                strokeWidth={2}
                data-oid="ohf72_g"
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#82ca9d"
                strokeWidth={2}
                data-oid="j8c-7qo"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
