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
        data-oid="t-8.8qc"
      >
        <h3 className="text-2xl font-semibold" data-oid="r44psy7">
          Dashboard Overview
        </h3>
        <div className="flex items-center gap-2" data-oid="-35o0ey">
          <span className="text-sm font-medium" data-oid="-yczcim">
            Compare to:
          </span>
          <Select
            value={comparisonPeriod}
            onValueChange={setComparisonPeriod}
            data-oid="38exd1l"
          >
            <SelectTrigger className="w-[180px]" data-oid="v_qihxz">
              <SelectValue placeholder="Select period" data-oid="j0d4ie7" />
            </SelectTrigger>
            <SelectContent data-oid="mq9:mgt">
              <SelectItem value="previous_month" data-oid="itgcqpy">
                Previous Month
              </SelectItem>
              <SelectItem value="previous_quarter" data-oid="r4ul2wq">
                Previous Quarter
              </SelectItem>
              <SelectItem value="previous_year" data-oid="vww:dro">
                Previous Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        data-oid="xc9uh4o"
      >
        <OverviewCards comparisonPeriod={comparisonPeriod} data-oid="hmskja1" />
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="-1et5-p"
      >
        <Card className="col-span-4" data-oid="-di4x5x">
          <CardHeader data-oid="n79pnng">
            <CardTitle className="text-xl font-semibold" data-oid="d.zgbo2">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2" data-oid="53xvtga">
            <RevenueChart
              comparisonPeriod={comparisonPeriod}
              data-oid="ok1l266"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="a-mvy69">
          <CardHeader data-oid="r9g2tkg">
            <CardTitle className="text-xl font-semibold" data-oid="jqnvilc">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="kfxs7ag">
            <RecentTransactions data-oid="j.s8j6a" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="tjja1yi"
      >
        <Card className="col-span-4" data-oid="1ew4nfq">
          <CardHeader data-oid="c09ja13">
            <CardTitle className="text-xl font-semibold" data-oid="7jgc.tp">
              Account Growth
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="-aqvy7y">
            <AccountGrowth
              comparisonPeriod={comparisonPeriod}
              data-oid="n.zi4so"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3" data-oid="pha7jxb">
          <CardHeader data-oid="zpz_ty5">
            <CardTitle className="text-xl font-semibold" data-oid=":d9o75t">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="wrg3r67">
            <TopProducts data-oid="elyis7c" />
          </CardContent>
        </Card>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4"
        data-oid="rws8dsi"
      >
        <Card className="col-span-4" data-oid="5hveyhf">
          <CardHeader data-oid="4gjwprm">
            <CardTitle className="text-xl font-semibold" data-oid="_iv4:xw">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="kac032:">
            <UserActivity data-oid=".mj57_i" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
