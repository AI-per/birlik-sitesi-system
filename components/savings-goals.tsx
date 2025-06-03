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
    <Card data-oid="692wuj1">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="41-w1ze"
      >
        <CardTitle className="text-md font-medium" data-oid="h_ocek0">
          Savings Goals
        </CardTitle>
        <Button variant="outline" size="icon" data-oid="7-_pa73">
          <PlusCircle className="h-4 w-4" data-oid="y.l0ezm" />
          <span className="sr-only" data-oid="q-l2yiw">
            Add new savings goal
          </span>
        </Button>
      </CardHeader>
      <CardContent data-oid="lgjls9y">
        <div className="space-y-4" data-oid="ol6xs61">
          {savingsGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div key={goal.name} className="space-y-2" data-oid="rjzxts_">
                <div
                  className="flex justify-between text-sm"
                  data-oid="b_h6p-q"
                >
                  <span data-oid="qeqzp55">{goal.name}</span>
                  <span data-oid="v:a0ywv">
                    ${goal.current.toLocaleString()} / $
                    {goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  data-oid="vmq.2hy"
                />

                <p
                  className="text-xs text-right text-muted-foreground"
                  data-oid="._:d2f5"
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
