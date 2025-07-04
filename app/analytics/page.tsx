"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/date-range-picker";
import { OverviewTab } from "@/components/analytics/overview-tab";
import { AnalyticsTab } from "@/components/analytics/analytics-tab";
import { ReportsTab } from "@/components/analytics/reports-tab";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const handleExportData = () => {
    // Implement export functionality here
    console.log("Exporting data...");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6" data-oid="i5w0kwf">
      <div
        className="flex items-center justify-between space-y-2"
        data-oid=":y5-mqn"
      >
        <h2 className="text-3xl font-bold tracking-tight" data-oid="il:3eb.">
          Analytics
        </h2>
        <div className="flex items-center space-x-2" data-oid="60ix.7l">
          <DateRangePicker data-oid="w6gvz-8" />
          <Button
            onClick={handleExportData}
            className="flex items-center gap-2"
            data-oid="j5x6h8v"
          >
            <Download className="h-4 w-4" data-oid="357m9q-" />
            Export Data
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" data-oid="x51xbx.">
        <TabsList className="grid w-full grid-cols-3" data-oid="f.:fujx">
          <TabsTrigger value="overview" data-oid="3jyz9qr">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="h1-infx">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="crv9d09">
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="9nuyskz">
          <OverviewTab data-oid="aw-bv__" />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="8enwn41">
          <AnalyticsTab data-oid="r8z8uce" />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="-mdisz:">
          <ReportsTab data-oid="o1fhf6t" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
