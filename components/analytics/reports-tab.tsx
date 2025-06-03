"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Printer } from "lucide-react";

const reportTypes = [
  "Financial Summary",
  "Customer Acquisition",
  "Product Performance",
  "Risk Assessment",
  "Marketing Campaign Analysis",
  "Operational Efficiency",
];

const dummyReportData = {
  "Financial Summary": [
    { id: 1, metric: "Total Revenue", value: "$1,234,567" },
    { id: 2, metric: "Net Profit", value: "$345,678" },
    { id: 3, metric: "Operating Expenses", value: "$567,890" },
    { id: 4, metric: "Gross Margin", value: "28%" },
    { id: 5, metric: "Return on Investment", value: "15%" },
  ],

  "Customer Acquisition": [
    { id: 1, metric: "New Customers", value: "1,234" },
    { id: 2, metric: "Customer Acquisition Cost", value: "$50" },
    { id: 3, metric: "Conversion Rate", value: "3.5%" },
    { id: 4, metric: "Customer Lifetime Value", value: "$1,200" },
    { id: 5, metric: "Churn Rate", value: "2.3%" },
  ],

  // Add more report types here
};

export function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0]);

  const handleGenerateReport = () => {
    console.log(`Generating ${selectedReport} report...`);
  };

  const handleDownloadReport = () => {
    console.log(`Downloading ${selectedReport} report...`);
  };

  const handlePrintReport = () => {
    console.log(`Printing ${selectedReport} report...`);
  };

  return (
    <div className="space-y-4" data-oid="62_l_9q">
      <Card data-oid="2_f.hy-">
        <CardHeader data-oid="nj2-rok">
          <CardTitle className="text-xl font-semibold" data-oid="c7dw2__">
            Generate Report
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4" data-oid="dlwwnul">
          <Select
            value={selectedReport}
            onValueChange={setSelectedReport}
            data-oid="6z7u062"
          >
            <SelectTrigger className="w-[240px]" data-oid="c7igjai">
              <SelectValue
                placeholder="Select report type"
                data-oid="2uo6r3u"
              />
            </SelectTrigger>
            <SelectContent data-oid="643g.q6">
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type} data-oid="xp2_pt7">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport} data-oid=".psktzh">
            Generate Report
          </Button>
        </CardContent>
      </Card>
      <Card data-oid="l_eld87">
        <CardHeader data-oid="08.sd8_">
          <CardTitle className="text-xl font-semibold" data-oid="gfgf_dp">
            {selectedReport} Report
          </CardTitle>
        </CardHeader>
        <CardContent data-oid="r7kf0n2">
          <Table data-oid="m7m3o-p">
            <TableHeader data-oid="thb.b0p">
              <TableRow data-oid="k5ez879">
                <TableHead data-oid="tu68mtp">Metric</TableHead>
                <TableHead data-oid="56g2zlf">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody data-oid="hessi6h">
              {dummyReportData[selectedReport]?.map((row) => (
                <TableRow key={row.id} data-oid="mblwmj8">
                  <TableCell data-oid="kchzcic">{row.metric}</TableCell>
                  <TableCell data-oid="0mzpfxh">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end space-x-2 mt-4" data-oid="n7s2bf9">
            <Button
              variant="outline"
              onClick={handleDownloadReport}
              data-oid="u1exgt9"
            >
              <Download className="mr-2 h-4 w-4" data-oid="q138.c1" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handlePrintReport}
              data-oid="uxjd.ts"
            >
              <Printer className="mr-2 h-4 w-4" data-oid="qhr3gg0" />
              Print
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
