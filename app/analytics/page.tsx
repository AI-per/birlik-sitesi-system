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
    <div className="flex-1 space-y-4 p-8 pt-6" data-oid="fa.:axk">
      <div
        className="flex items-center justify-between space-y-2"
        data-oid="c13dah9"
      >
        <h2 className="text-3xl font-bold tracking-tight" data-oid="f:df_y2">
          Analytics
        </h2>
        <div className="flex items-center space-x-2" data-oid="tp7vp6w">
          <DateRangePicker data-oid="tajkatq" />
          <Button
            onClick={handleExportData}
            className="flex items-center gap-2"
            data-oid="2.tkrak"
          >
            <Download className="h-4 w-4" data-oid="xig8-p_" />
            Export Data
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" data-oid="h61piag">
        <TabsList className="grid w-full grid-cols-4" data-oid="cay8tb6">
          <TabsTrigger value="overview" data-oid="c9l35s3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="m6h38yf">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="gt315n:">
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" data-oid="b09wt.m">
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="9p3qswd">
          <OverviewTab data-oid="..jr8p2" />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="c-9s2es">
          <AnalyticsTab data-oid="eh_sra2" />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="qtlqs64">
          <ReportsTab data-oid=".k6n:yd" />
        </TabsContent>
        <TabsContent
          value="notifications"
          className="space-y-4"
          data-oid="unx1amf"
        >
          <NotificationsTab data-oid="2lun71m" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
