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
    <div className="space-y-4" data-oid="b.5gvvk">
      <div className="flex items-center justify-between" data-oid="na3f-sp">
        <h2 className="text-lg font-semibold" data-oid="nbc2r68">
          Business Metrics
        </h2>
        <Button variant="outline" size="sm" data-oid="isq2490">
          View Details{" "}
          <ArrowRight className="ml-2 h-4 w-4" data-oid="-46y6mh" />
        </Button>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-oid="jtkfy-g"
      >
        {metrics.map((metric) => (
          <Card key={metric.id} data-oid="sel0otf">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="9p7-n:k"
            >
              <CardTitle className="text-sm font-medium" data-oid="nv4er:4">
                {metric.title}
              </CardTitle>
              <metric.icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="dbe4v49"
              />
            </CardHeader>
            <CardContent data-oid="48s0u.6">
              <p className="text-xs text-muted-foreground" data-oid="hj99t12">
                {metric.subtitle}
              </p>
              <div className="mt-2 space-y-2" data-oid="74-guzp">
                <div
                  className="flex items-center justify-between text-xs"
                  data-oid="603vqsn"
                >
                  <span
                    className={`px-2 py-1 rounded-full ${statusColors[metric.status]}`}
                    data-oid="4dah2t."
                  >
                    {metric.status}
                  </span>
                  <span className="text-muted-foreground" data-oid="tuiei3v">
                    {metric.current} / {metric.target} {metric.unit}
                  </span>
                </div>
                <div
                  className="w-full bg-secondary rounded-full h-1.5"
                  data-oid="h.gadh_"
                >
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                    data-oid="_:12p5w"
                  />
                </div>
                <div
                  className="flex justify-between items-center text-sm"
                  data-oid="pz27ilh"
                >
                  <span className="font-medium" data-oid="yo0:o9s">
                    {metric.unit}
                    {metric.target.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground" data-oid="c7_.ajj">
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
