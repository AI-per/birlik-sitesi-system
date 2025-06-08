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
    <div className="space-y-4" data-oid="nzd-z7v">
      <div className="flex justify-between items-center" data-oid="gw1ris0">
        <h3 className="text-2xl font-semibold" data-oid="qbffx.f">
          Detailed Analytics
        </h3>
        <Select
          value={timeFrame}
          onValueChange={setTimeFrame}
          data-oid="xozzq8j"
        >
          <SelectTrigger className="w-[180px]" data-oid="jegbw14">
            <SelectValue placeholder="Select time frame" data-oid="nei:9.z" />
          </SelectTrigger>
          <SelectContent data-oid="okdm0pq">
            <SelectItem value="last_7_days" data-oid="2g9y0e8">
              Last 7 Days
            </SelectItem>
            <SelectItem value="last_30_days" data-oid="iw24oo7">
              Last 30 Days
            </SelectItem>
            <SelectItem value="last_90_days" data-oid="r6xcbta">
              Last 90 Days
            </SelectItem>
            <SelectItem value="last_12_months" data-oid="oi_vhbe">
              Last 12 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="7:jb6rl"
      >
        <Card className="col-span-4" data-oid="s0lv_b.">
          <CardHeader data-oid="ohsyo8.">
            <CardTitle className="text-xl font-semibold" data-oid="3rxcyyy">
              Customer Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="eu9fd7s">
            <ResponsiveContainer width="100%" height={300} data-oid="viaz554">
              <BarChart data={customerSegmentationData} data-oid="99kcu.1">
                <XAxis dataKey="segment" data-oid="cv4_0eg" />
                <YAxis data-oid="vtn3bbv" />
                <Tooltip data-oid="l_o:qmd" />
                <Bar
                  dataKey="count"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="mkf8qh1"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="3mp1wb:">
          <CardHeader data-oid="klqbeou">
            <CardTitle className="text-xl font-semibold" data-oid="lmy:--z">
              Customer Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="c45mvm7">
            <ResponsiveContainer width="100%" height={300} data-oid="x:pdbkf">
              <LineChart data={retentionRateData} data-oid="9:10n5n">
                <XAxis dataKey="month" data-oid="r53-aww" />
                <YAxis data-oid="b9e1qli" />
                <Tooltip data-oid="bdg_9wp" />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="4v.wyjg"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        data-oid="eubd_vb"
      >
        <Card className="col-span-4" data-oid="li::txy">
          <CardHeader data-oid="4q6-pic">
            <CardTitle className="text-xl font-semibold" data-oid="x50kac8">
              Channel Performance
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="ryf8q4v">
            <ResponsiveContainer width="100%" height={300} data-oid="-6daj3.">
              <BarChart data={channelPerformanceData} data-oid="p2rzdjg">
                <XAxis dataKey="channel" data-oid="wpy.:5t" />
                <YAxis yAxisId="left" data-oid="4.hhizf" />
                <YAxis yAxisId="right" orientation="right" data-oid="dgf4wxv" />
                <Tooltip data-oid=":7x1mzf" />
                <Bar
                  yAxisId="left"
                  dataKey="acquisitions"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                  data-oid="na-np5d"
                />

                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
                  data-oid="djiutce"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="1cab9in">
          <CardHeader data-oid="_ttefu0">
            <CardTitle className="text-xl font-semibold" data-oid="yh810hs">
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="5ct55lz">
            <div data-oid="dle1k3t">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="-21-_ru"
              >
                Customer Lifetime Value
              </p>
              <p className="text-2xl font-bold" data-oid="ak4cqw_">
                $1,250
              </p>
            </div>
            <div data-oid="pxq7d1k">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="0ln:vh8"
              >
                Net Promoter Score
              </p>
              <p className="text-2xl font-bold" data-oid="w._pvu2">
                72
              </p>
            </div>
            <div data-oid="j9v6fwz">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="ug_a8jr"
              >
                Customer Acquisition Cost
              </p>
              <p className="text-2xl font-bold" data-oid="ae9htha">
                $75
              </p>
            </div>
            <div data-oid="9pt8lne">
              <p
                className="text-sm font-medium text-muted-foreground"
                data-oid="92q8-1j"
              >
                Average Order Value
              </p>
              <p className="text-2xl font-bold" data-oid="._c7fob">
                $120
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
