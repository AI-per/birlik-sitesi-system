"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const customerSegmentationData = [
  { segment: "High Value", count: 1200 },
  { segment: "Medium Value", count: 5300 },
  { segment: "Low Value", count: 8500 },
  { segment: "At Risk", count: 1700 },
  { segment: "Lost", count: 800 },
];

const retentionRateData = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 93 },
  { month: "Mar", rate: 94 },
  { month: "Apr", rate: 95 },
  { month: "May", rate: 97 },
  { month: "Jun", rate: 98 },
];

const channelPerformanceData = [
  { channel: "Direct", acquisitions: 1200, revenue: 50000 },
  { channel: "Organic Search", acquisitions: 2500, revenue: 75000 },
  { channel: "Paid Search", acquisitions: 1800, revenue: 60000 },
  { channel: "Social Media", acquisitions: 1500, revenue: 45000 },
  { channel: "Email", acquisitions: 900, revenue: 30000 },
];

export function AnalyticsTab() {
  const { theme } = useTheme();
  const [timeFrame, setTimeFrame] = useState("last_30_days");

  return (
    <div className="space-y-4" data-oid="2o28.hc">
      <div className="flex justify-between items-center" data-oid="p6h:y2:">
        <h3 className="text-2xl font-semibold" data-oid="ai:9ph_">
          Detailed Analytics
        </h3>
        <Select
          value={timeFrame}
          onValueChange={setTimeFrame}
          data-oid="7j:6qpi"
        >
          <SelectTrigger className="w-[180px]" data-oid="3m0r.gw">
            <SelectValue placeholder="Select time frame" data-oid="c36lbw8" />
          </SelectTrigger>
          <SelectContent data-oid="x788g7n">
            <SelectItem value="last_7_days" data-oid="hlp76r7">
              Last 7 Days
            </SelectItem>
            <SelectItem value="last_30_days" data-oid="882ehwg">
              Last 30 Days
            </SelectItem>
            <SelectItem value="last_90_days" data-oid="r2o_7wj">
              Last 90 Days
            </SelectItem>
            <SelectItem value="last_12_months" data-oid="jri0085">
              Last 12 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="l_b0.1u"
      >
        <Card className="col-span-4" data-oid="9np51-j">
          <CardHeader data-oid="_x_e6sq">
            <CardTitle className="text-xl font-semibold" data-oid="e15epq7">
              Customer Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="n624fjx">
            <ResponsiveContainer width="100%" height={300} data-oid="zo-bj1a">
              <BarChart data={customerSegmentationData} data-oid="dft-.wh">
                <XAxis dataKey="segment" data-oid="lkl6rko" />
                <YAxis data-oid="ucw9gk1" />
                <Tooltip data-oid="-1b8uf6" />
                <Bar
                  dataKey="count"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="bq9e1qh"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="2wjjmtz">
          <CardHeader data-oid="l1p:cvo">
            <CardTitle className="text-xl font-semibold" data-oid="6f2ts_3">
              Customer Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="koup7ou">
            <ResponsiveContainer width="100%" height={300} data-oid="4fjiwaq">
              <LineChart data={retentionRateData} data-oid="7d-q_p8">
                <XAxis dataKey="month" data-oid="3ka.xov" />
                <YAxis data-oid="00osnjo" />
                <Tooltip data-oid="b1rlh89" />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="m:ykghb"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="pmwfqk0"
      >
        <Card className="col-span-4" data-oid="rjskrre">
          <CardHeader data-oid="h1jl051">
            <CardTitle className="text-xl font-semibold" data-oid="r34ifqu">
              Channel Performance
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="v_t:4my">
            <ResponsiveContainer width="100%" height={300} data-oid="90c1uil">
              <BarChart data={channelPerformanceData} data-oid="vu_mys-">
                <XAxis dataKey="channel" data-oid="24g1nyf" />
                <YAxis yAxisId="left" data-oid="3fae2ra" />
                <YAxis yAxisId="right" orientation="right" data-oid="hpoa4lu" />
                <Tooltip data-oid="bjqvjgl" />
                <Bar
                  yAxisId="left"
                  dataKey="acquisitions"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="g:-f92o"
                />

                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
                  data-oid="3-16j2r"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="lq0_3oy">
          <CardHeader data-oid="ds3sf7h">
            <CardTitle className="text-xl font-semibold" data-oid="_u2hf4e">
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="3nhdbvv">
            <div data-oid="e8ze7f4">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="6lpiea8"
              >
                Customer Lifetime Value
              </p>
              <p className="text-2xl font-bold" data-oid="ryff7ak">
                $1,250
              </p>
            </div>
            <div data-oid="rb:08ls">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="-l-mwkj"
              >
                Net Promoter Score
              </p>
              <p className="text-2xl font-bold" data-oid="bvk.8fp">
                72
              </p>
            </div>
            <div data-oid="74clqx-">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="um0-e_v"
              >
                Customer Acquisition Cost
              </p>
              <p className="text-2xl font-bold" data-oid="fa4-7uq">
                $75
              </p>
            </div>
            <div data-oid="hd_:.h5">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="klvu31h"
              >
                Average Order Value
              </p>
              <p className="text-2xl font-bold" data-oid="dimxh-d">
                $120
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
