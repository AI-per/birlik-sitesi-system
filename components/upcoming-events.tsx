import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Emergency Fund",
    subtitle: "3 months of expenses saved",
    icon: PiggyBank,
    status: "In Progress",
    progress: 65,
    target: 15000,
    date: "Dec 2024",
  },
  {
    id: 2,
    title: "Stock Portfolio",
    subtitle: "Tech sector investment plan",
    icon: TrendingUp,
    status: "Pending",
    progress: 30,
    target: 50000,
    date: "Jun 2024",
  },
  {
    id: 3,
    title: "Debt Repayment",
    subtitle: "Student loan payoff plan",
    icon: CreditCard,
    status: "In Progress",
    progress: 45,
    target: 25000,
    date: "Mar 2025",
  },
];

const statusColors = {
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "In Progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export function UpcomingEvents() {
  return (
    <div className="space-y-4" data-oid="-1.--uo">
      <div className="flex items-center justify-between" data-oid="fdabaff">
        <h2 className="text-lg font-semibold" data-oid="juaso1_">
          Upcoming Events
        </h2>
        <Button variant="outline" size="sm" data-oid="liaccdj">
          View All <ArrowRight className="ml-2 h-4 w-4" data-oid="my8ds6:" />
        </Button>
      </div>
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-oid="wkyq42a"
      >
        {events.map((event) => (
          <Card key={event.id} data-oid=".j2fue-">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid=":7taol9"
            >
              <CardTitle className="text-sm font-medium" data-oid="ke-koeu">
                {event.title}
              </CardTitle>
              <event.icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="f50srdv"
              />
            </CardHeader>
            <CardContent data-oid="8o5erzq">
              <p className="text-xs text-muted-foreground" data-oid="mb0jbc2">
                {event.subtitle}
              </p>
              <div className="mt-2 space-y-2" data-oid="kaumd_i">
                <div
                  className="flex items-center justify-between text-xs"
                  data-oid="dyhmzfg"
                >
                  <span
                    className={`px-2 py-1 rounded-full ${statusColors[event.status]}`}
                    data-oid="oxtogor"
                  >
                    {event.status}
                  </span>
                  <span className="text-muted-foreground" data-oid="_xxrvs6">
                    <Calendar
                      className="inline mr-1 h-3 w-3"
                      data-oid="xfx3ga7"
                    />

                    {event.date}
                  </span>
                </div>
                <div
                  className="w-full bg-secondary rounded-full h-1.5"
                  data-oid="mhic:au"
                >
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${event.progress}%` }}
                    data-oid="cd1czoa"
                  />
                </div>
                <div
                  className="flex justify-between items-center text-sm"
                  data-oid="whmf734"
                >
                  <span className="font-medium" data-oid="z.iwp8z">
                    ${event.target.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground" data-oid="5isfu:v">
                    {event.progress}% complete
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
