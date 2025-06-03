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
    <div className="space-y-4" data-oid="w57ran9">
      <div className="flex items-center justify-between" data-oid="-i9r-a3">
        <h2 className="text-lg font-semibold" data-oid="r3n1roj">
          Business Metrics
        </h2>
        <Button variant="outline" size="sm" data-oid="ual5v-v">
          View Details{" "}
          <ArrowRight className="ml-2 h-4 w-4" data-oid="uuz5bqr" />
        </Button>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-oid="b23zd96"
      >
        {metrics.map((metric) => (
          <Card key={metric.id} data-oid="mk.mm32">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="wncfckx"
            >
              <CardTitle className="text-sm font-medium" data-oid="kvbjczh">
                {metric.title}
              </CardTitle>
              <metric.icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="8j7ydjq"
              />
            </CardHeader>
            <CardContent data-oid="a8imndh">
              <p className="text-xs text-muted-foreground" data-oid="1c4rdit">
                {metric.subtitle}
              </p>
              <div className="mt-2 space-y-2" data-oid=".tvw0t:">
                <div
                  className="flex items-center justify-between text-xs"
                  data-oid="k:3iddv"
                >
                  <span
                    className={`px-2 py-1 rounded-full ${statusColors[metric.status]}`}
                    data-oid="t2gu4-e"
                  >
                    {metric.status}
                  </span>
                  <span className="text-muted-foreground" data-oid="dz6tsml">
                    {metric.current} / {metric.target} {metric.unit}
                  </span>
                </div>
                <div
                  className="w-full bg-secondary rounded-full h-1.5"
                  data-oid="dkhq7q_"
                >
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                    data-oid="kshaxxg"
                  />
                </div>
                <div
                  className="flex justify-between items-center text-sm"
                  data-oid="08swl_3"
                >
                  <span className="font-medium" data-oid="ut3ayni">
                    {metric.unit}
                    {metric.target.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground" data-oid="ki_95c:">
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
