import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";

const metrics = [
  {
    id: 1,
    title: "Revenue Growth",
    subtitle: "Monthly revenue target",
    icon: TrendingUp,
    status: "On Track",
    progress: 75,
    target: 100000,
    current: 75000,
    unit: "$",
  },
  {
    id: 2,
    title: "Customer Acquisition",
    subtitle: "New customers this quarter",
    icon: Users,
    status: "Behind",
    progress: 60,
    target: 1000,
    current: 600,
    unit: "",
  },
  {
    id: 3,
    title: "Average Order Value",
    subtitle: "Target AOV for Q3",
    icon: DollarSign,
    status: "Ahead",
    progress: 110,
    target: 150,
    current: 165,
    unit: "$",
  },
];

const statusColors = {
  "On Track":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Behind: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Ahead: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export function BusinessMetrics() {
  return (
    <div className="space-y-4" data-oid=":5b2-ia">
      <div className="flex items-center justify-between" data-oid="6hj_ol4">
        <h2 className="text-lg font-semibold" data-oid="58dpn-f">
          Business Metrics
        </h2>
        <Button variant="outline" size="sm" data-oid="3jmp.l6">
          View Details{" "}
          <ArrowRight className="ml-2 h-4 w-4" data-oid="010l:6x" />
        </Button>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-oid="myac4x."
      >
        {metrics.map((metric) => (
          <Card key={metric.id} data-oid="mv_3f5x">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="g-0r4v9"
            >
              <CardTitle className="text-sm font-medium" data-oid="zktoor4">
                {metric.title}
              </CardTitle>
              <metric.icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="452omr4"
              />
            </CardHeader>
            <CardContent data-oid="_bo76:9">
              <p className="text-xs text-muted-foreground" data-oid="0qqz3u8">
                {metric.subtitle}
              </p>
              <div className="mt-2 space-y-2" data-oid="9p4zgpj">
                <div
                  className="flex items-center justify-between text-xs"
                  data-oid="5iq49d4"
                >
                  <span
                    className={`px-2 py-1 rounded-full ${statusColors[metric.status]}`}
                    data-oid="1znixxr"
                  >
                    {metric.status}
                  </span>
                  <span className="text-muted-foreground" data-oid="9nnm-21">
                    {metric.current} / {metric.target} {metric.unit}
                  </span>
                </div>
                <div
                  className="w-full bg-secondary rounded-full h-1.5"
                  data-oid="g4siq-u"
                >
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                    data-oid="hmstkmv"
                  />
                </div>
                <div
                  className="flex justify-between items-center text-sm"
                  data-oid="jyimrms"
                >
                  <span className="font-medium" data-oid="iawvq2f">
                    {metric.unit}
                    {metric.target.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground" data-oid="c4-1jv2">
                    {metric.progress}% complete
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
