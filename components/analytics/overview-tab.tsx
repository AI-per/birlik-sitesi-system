"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewCards } from "@/components/analytics/overview-cards";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { RecentTransactions } from "@/components/analytics/recent-transactions";
import { AccountGrowth } from "@/components/analytics/account-growth";
import { TopProducts } from "@/components/analytics/top-products";
import { UserActivity } from "@/components/analytics/user-activity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OverviewTab() {
  const [comparisonPeriod, setComparisonPeriod] = useState("previous_month");

  return (
    <>
      <div
        className="flex justify-between items-center mb-4"
        data-oid="-1up861"
      >
        <h3 className="text-2xl font-semibold" data-oid=":wvjcfq">
          Dashboard Overview
        </h3>
        <div className="flex items-center gap-2" data-oid="ui8o9h-">
          <span className="text-sm font-medium" data-oid="ych-ov7">
            Compare to:
          </span>
          <Select
            value={comparisonPeriod}
            onValueChange={setComparisonPeriod}
            data-oid="nqcq:xb"
          >
            <SelectTrigger className="w-[180px]" data-oid="dlzdmsw">
              <SelectValue placeholder="Select period" data-oid="15s.796" />
            </SelectTrigger>
            <SelectContent data-oid="x1-jyim">
              <SelectItem value="previous_month" data-oid="8b89yum">
                Previous Month
              </SelectItem>
              <SelectItem value="previous_quarter" data-oid=".p3h4wd">
                Previous Quarter
              </SelectItem>
              <SelectItem value="previous_year" data-oid="z2k4:a.">
                Previous Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        data-oid="g552f0x"
      >
        <OverviewCards comparisonPeriod={comparisonPeriod} data-oid="oq73hyo" />
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="6n:7_xf"
      >
        <Card className="col-span-4" data-oid="qi:b-a5">
          <CardHeader data-oid="u1.:5xq">
            <CardTitle className="text-xl font-semibold" data-oid="mkwmnpl">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2" data-oid="y0io650">
            <RevenueChart
              comparisonPeriod={comparisonPeriod}
              data-oid="s.ti-2q"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="1ih7.l4">
          <CardHeader data-oid="ngz9__i">
            <CardTitle className="text-xl font-semibold" data-oid="efw8t4.">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="hyba1o-">
            <RecentTransactions data-oid="0mu41ws" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="ijj5yyi"
      >
        <Card className="col-span-4" data-oid="gnge24v">
          <CardHeader data-oid="wy_bajk">
            <CardTitle className="text-xl font-semibold" data-oid="0g4_h9s">
              Account Growth
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="3727j2y">
            <AccountGrowth
              comparisonPeriod={comparisonPeriod}
              data-oid="z15lydd"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="-sw-zaa">
          <CardHeader data-oid="3.k2bbv">
            <CardTitle className="text-xl font-semibold" data-oid="jry6qck">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="_70e:i8">
            <TopProducts data-oid="jmk6tkd" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="mf46vmt"
      >
        <Card className="col-span-4" data-oid="whyrd-7">
          <CardHeader data-oid="..2t3q6">
            <CardTitle className="text-xl font-semibold" data-oid="z1wnqx2">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="kn7fxfx">
            <UserActivity data-oid="_rrk5vk" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
