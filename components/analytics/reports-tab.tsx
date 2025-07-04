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
    <div className="space-y-4" data-oid="jekry:e">
      <Card data-oid="f93a4up">
        <CardHeader data-oid="z8qp6b:">
          <CardTitle className="text-xl font-semibold" data-oid="e5lkj-6">
            Generate Report
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4" data-oid="svf-9.b">
          <Select
            value={selectedReport}
            onValueChange={setSelectedReport}
            data-oid=":eozln3"
          >
            <SelectTrigger className="w-[240px]" data-oid="ioos3u2">
              <SelectValue
                placeholder="Select report type"
                data-oid="ke0vpk4"
              />
            </SelectTrigger>
            <SelectContent data-oid=":3hiajp">
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type} data-oid="o4w:_63">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport} data-oid="w:q37:e">
            Generate Report
          </Button>
        </CardContent>
      </Card>
      <Card data-oid="w9fyvw6">
        <CardHeader data-oid="ch45jug">
          <CardTitle className="text-xl font-semibold" data-oid="u_cdc37">
            {selectedReport} Report
          </CardTitle>
        </CardHeader>
        <CardContent data-oid=":tizgit">
          <Table data-oid="yn2zbxh">
            <TableHeader data-oid="fp3i.1m">
              <TableRow data-oid="7aqzjk0">
                <TableHead data-oid="-g5rcha">Metric</TableHead>
                <TableHead data-oid="_ugg1nw">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody data-oid="k38ao90">
              {dummyReportData[selectedReport]?.map((row) => (
                <TableRow key={row.id} data-oid="ctksk1y">
                  <TableCell data-oid="yec4-68">{row.metric}</TableCell>
                  <TableCell data-oid="fmnzkk6">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end space-x-2 mt-4" data-oid="._v4g:1">
            <Button
              variant="outline"
              onClick={handleDownloadReport}
              data-oid="lhq_f86"
            >
              <Download className="mr-2 h-4 w-4" data-oid="xavdk_7" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handlePrintReport}
              data-oid="-d_j717"
            >
              <Printer className="mr-2 h-4 w-4" data-oid="xplowz4" />
              Print
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
