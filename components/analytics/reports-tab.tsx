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
    <div className="space-y-4" data-oid="78a9-lv">
      <Card data-oid=":na2b5q">
        <CardHeader data-oid="p9dwvt8">
          <CardTitle className="text-xl font-semibold" data-oid="c8jrw.4">
            Generate Report
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4" data-oid="mce3nv4">
          <Select
            value={selectedReport}
            onValueChange={setSelectedReport}
            data-oid="su4:n1q"
          >
            <SelectTrigger className="w-[240px]" data-oid="r6ofwk0">
              <SelectValue
                placeholder="Select report type"
                data-oid="btgmjn6"
              />
            </SelectTrigger>
            <SelectContent data-oid="5vl2mk.">
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type} data-oid="3w251.q">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport} data-oid="1gz8l-l">
            Generate Report
          </Button>
        </CardContent>
      </Card>
      <Card data-oid="su1w.pt">
        <CardHeader data-oid="6bs2:z7">
          <CardTitle className="text-xl font-semibold" data-oid="3hgzw5_">
            {selectedReport} Report
          </CardTitle>
        </CardHeader>
        <CardContent data-oid="x38wqxy">
          <Table data-oid="2k4skx:">
            <TableHeader data-oid="g378wqo">
              <TableRow data-oid="s3jqh82">
                <TableHead data-oid="9_g6.n2">Metric</TableHead>
                <TableHead data-oid="m5_yiql">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody data-oid="apbulhq">
              {dummyReportData[selectedReport]?.map((row) => (
                <TableRow key={row.id} data-oid="p1.nojh">
                  <TableCell data-oid="a2:4q.0">{row.metric}</TableCell>
                  <TableCell data-oid="m7q097f">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end space-x-2 mt-4" data-oid="-cjc5jd">
            <Button
              variant="outline"
              onClick={handleDownloadReport}
              data-oid="m-ivn-s"
            >
              <Download className="mr-2 h-4 w-4" data-oid="txyfu-:" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handlePrintReport}
              data-oid="78ofb4:"
            >
              <Printer className="mr-2 h-4 w-4" data-oid="5cs8dt6" />
              Print
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
