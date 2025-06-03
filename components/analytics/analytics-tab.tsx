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
    <div className="space-y-4" data-oid="9gd86by">
      <div className="flex justify-between items-center" data-oid="hy2uw6t">
        <h3 className="text-2xl font-semibold" data-oid="_q-n4_o">
          Detailed Analytics
        </h3>
        <Select
          value={timeFrame}
          onValueChange={setTimeFrame}
          data-oid="4jdcd4h"
        >
          <SelectTrigger className="w-[180px]" data-oid="vftg661">
            <SelectValue placeholder="Select time frame" data-oid="plor:xu" />
          </SelectTrigger>
          <SelectContent data-oid="c2j57lk">
            <SelectItem value="last_7_days" data-oid="b_g0lh:">
              Last 7 Days
            </SelectItem>
            <SelectItem value="last_30_days" data-oid="-_7s18e">
              Last 30 Days
            </SelectItem>
            <SelectItem value="last_90_days" data-oid="hk2180j">
              Last 90 Days
            </SelectItem>
            <SelectItem value="last_12_months" data-oid="2x3yca8">
              Last 12 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="tswy30."
      >
        <Card className="col-span-4" data-oid="j72:j0x">
          <CardHeader data-oid="7wgvxwb">
            <CardTitle className="text-xl font-semibold" data-oid="6oxqaxv">
              Customer Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="43pc1-d">
            <ResponsiveContainer width="100%" height={300} data-oid="0vr59s0">
              <BarChart data={customerSegmentationData} data-oid="sllrcd.">
                <XAxis dataKey="segment" data-oid="qs0wryc" />
                <YAxis data-oid="b088-eh" />
                <Tooltip data-oid="b:rjuxi" />
                <Bar
                  dataKey="count"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="o:6fbyy"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid=".6u3zk8">
          <CardHeader data-oid="ss.hd09">
            <CardTitle className="text-xl font-semibold" data-oid="m.gge:x">
              Customer Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="xgwp207">
            <ResponsiveContainer width="100%" height={300} data-oid="l:8nb-9">
              <LineChart data={retentionRateData} data-oid="9ztptwp">
                <XAxis dataKey="month" data-oid="u44g_85" />
                <YAxis data-oid="5fbeyur" />
                <Tooltip data-oid="pt._7p." />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="h.pzrd2"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="o:2w5uk"
      >
        <Card className="col-span-4" data-oid="e.0y.ih">
          <CardHeader data-oid="q4rcn3j">
            <CardTitle className="text-xl font-semibold" data-oid="v7t2oca">
              Channel Performance
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="tz6yr8z">
            <ResponsiveContainer width="100%" height={300} data-oid="2tvkiuk">
              <BarChart data={channelPerformanceData} data-oid="epa0109">
                <XAxis dataKey="channel" data-oid="7ue6.4z" />
                <YAxis yAxisId="left" data-oid="y7hyuqv" />
                <YAxis yAxisId="right" orientation="right" data-oid="nz19lu0" />
                <Tooltip data-oid="sawuaxr" />
                <Bar
                  yAxisId="left"
                  dataKey="acquisitions"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="6vmwar6"
                />

                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
                  data-oid="8g.a9rn"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="m.j0tgm">
          <CardHeader data-oid="d9d_zq7">
            <CardTitle className="text-xl font-semibold" data-oid="q:vj49d">
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="ntvqaky">
            <div data-oid="nv4na-7">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="ifygkov"
              >
                Customer Lifetime Value
              </p>
              <p className="text-2xl font-bold" data-oid="8e24_pf">
                $1,250
              </p>
            </div>
            <div data-oid="41o66-z">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="6ljqrvv"
              >
                Net Promoter Score
              </p>
              <p className="text-2xl font-bold" data-oid=":52z2px">
                72
              </p>
            </div>
            <div data-oid="k::p72:">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="b-gsvfc"
              >
                Customer Acquisition Cost
              </p>
              <p className="text-2xl font-bold" data-oid="uv_hy.8">
                $75
              </p>
            </div>
            <div data-oid="02_4mw:">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="t0a7x5s"
              >
                Average Order Value
              </p>
              <p className="text-2xl font-bold" data-oid="cfk2gs_">
                $120
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
