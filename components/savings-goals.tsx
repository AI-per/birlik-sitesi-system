import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const savingsGoals = [
  { name: "Emergency Fund", current: 10000, target: 25000 },
  { name: "Vacation", current: 3000, target: 5000 },
  { name: "New Car", current: 15000, target: 35000 },
];

export function SavingsGoals() {
  return (
    <Card data-oid="wa_4mlt">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="ecuqnk5"
      >
        <CardTitle className="text-md font-medium" data-oid="m:_yi0o">
          Savings Goals
        </CardTitle>
        <Button variant="outline" size="icon" data-oid=":k31tng">
          <PlusCircle className="h-4 w-4" data-oid="b7ptgab" />
          <span className="sr-only" data-oid="7jr4atz">
            Add new savings goal
          </span>
        </Button>
      </CardHeader>
      <CardContent data-oid="nvvit0z">
        <div className="space-y-4" data-oid="a8e7a50">
          {savingsGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div key={goal.name} className="space-y-2" data-oid="bz1-h-8">
                <div
                  className="flex justify-between text-sm"
                  data-oid="kgcb1iq"
                >
                  <span data-oid="3w_t7at">{goal.name}</span>
                  <span data-oid="xne55n_">
                    ${goal.current.toLocaleString()} / $
                    {goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  data-oid="om3b.je"
                />

                <p
                  className="text-xs text-right text-muted-foreground"
                  data-oid="e4qzsr:"
                >
                  {percentage.toFixed(1)}% complete
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
