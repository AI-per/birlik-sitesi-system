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
        data-oid="iza344_"
      >
        <h3 className="text-2xl font-semibold" data-oid="l5j4ubz">
          Dashboard Overview
        </h3>
        <div className="flex items-center gap-2" data-oid="-jtcv2f">
          <span className="text-sm font-medium" data-oid="v2ookno">
            Compare to:
          </span>
          <Select
            value={comparisonPeriod}
            onValueChange={setComparisonPeriod}
            data-oid="uq3_exb"
          >
            <SelectTrigger className="w-[180px]" data-oid="uc1zix6">
              <SelectValue placeholder="Select period" data-oid="9v0tzu8" />
            </SelectTrigger>
            <SelectContent data-oid="c2-cm4_">
              <SelectItem value="previous_month" data-oid="wf_x:l9">
                Previous Month
              </SelectItem>
              <SelectItem value="previous_quarter" data-oid="a7:shwm">
                Previous Quarter
              </SelectItem>
              <SelectItem value="previous_year" data-oid="u1msk:1">
                Previous Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        data-oid="eg7o5:r"
      >
        <OverviewCards comparisonPeriod={comparisonPeriod} data-oid="54qru.2" />
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="gqk3epz"
      >
        <Card className="col-span-4" data-oid="11:ij6h">
          <CardHeader data-oid="mapzbn0">
            <CardTitle className="text-xl font-semibold" data-oid="sssavj1">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2" data-oid="5ggds_w">
            <RevenueChart
              comparisonPeriod={comparisonPeriod}
              data-oid="08axcij"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="bkwdg1e">
          <CardHeader data-oid="7cjk50w">
            <CardTitle className="text-xl font-semibold" data-oid="_453owl">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="4dsc3b4">
            <RecentTransactions data-oid="fh2cxuc" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="edinjpy"
      >
        <Card className="col-span-4" data-oid=".xc1lq0">
          <CardHeader data-oid="m334x5o">
            <CardTitle className="text-xl font-semibold" data-oid="zdc9jwm">
              Account Growth
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="fuwjw:f">
            <AccountGrowth
              comparisonPeriod={comparisonPeriod}
              data-oid="ud5b0i5"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="a7f6q:s">
          <CardHeader data-oid="4jtdqcp">
            <CardTitle className="text-xl font-semibold" data-oid="mm.3uga">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="bcem1.d">
            <TopProducts data-oid="7.29qxh" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="pi6dkw:"
      >
        <Card className="col-span-4" data-oid="kpmkdn_">
          <CardHeader data-oid="3yx0p1h">
            <CardTitle className="text-xl font-semibold" data-oid="65vdyh7">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="4t_pu5l">
            <UserActivity data-oid="rikdczi" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
