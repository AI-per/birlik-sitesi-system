"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/date-range-picker";
import { OverviewTab } from "@/components/analytics/overview-tab";
import { AnalyticsTab } from "@/components/analytics/analytics-tab";
import { ReportsTab } from "@/components/analytics/reports-tab";
import { NotificationsTab } from "@/components/analytics/notifications-tab";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const handleExportData = () => {
    // Implement export functionality here
    console.log("Exporting data...");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6" data-oid="v:yizyn">
      <div
        className="flex items-center justify-between space-y-2"
        data-oid="ou-mu7b"
      >
        <h2 className="text-3xl font-bold tracking-tight" data-oid="akopfgm">
          Analytics
        </h2>
        <div className="flex items-center space-x-2" data-oid="xbu6jed">
          <DateRangePicker data-oid=".h_wkw7" />
          <Button
            onClick={handleExportData}
            className="flex items-center gap-2"
            data-oid="ef7:6hx"
          >
            <Download className="h-4 w-4" data-oid="xlgd3__" />
            Export Data
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" data-oid="hzqb500">
        <TabsList className="grid w-full grid-cols-4" data-oid="rc4w-3c">
          <TabsTrigger value="overview" data-oid="fyx78ha">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="ps-nie:">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="tfoaj6x">
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" data-oid="qtq0v9o">
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="yfa-1ox">
          <OverviewTab data-oid="cc0msek" />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="ge7-3su">
          <AnalyticsTab data-oid="2b3s2.q" />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="5ttdmj1">
          <ReportsTab data-oid="jp-f4py" />
        </TabsContent>
        <TabsContent
          value="notifications"
          className="space-y-4"
          data-oid="8.107rt"
        >
          <NotificationsTab data-oid="p7sfco:" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
