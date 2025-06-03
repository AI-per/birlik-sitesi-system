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
    <Card data-oid="8lhypmg">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="ir:alpx"
      >
        <CardTitle className="text-md font-medium" data-oid="y7rpwwa">
          Savings Goals
        </CardTitle>
        <Button variant="outline" size="icon" data-oid="yg9hh88">
          <PlusCircle className="h-4 w-4" data-oid="ompwqb3" />
          <span className="sr-only" data-oid="phras9a">
            Add new savings goal
          </span>
        </Button>
      </CardHeader>
      <CardContent data-oid="6widmd1">
        <div className="space-y-4" data-oid="-oi6kgp">
          {savingsGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div key={goal.name} className="space-y-2" data-oid="py3_s:b">
                <div
                  className="flex justify-between text-sm"
                  data-oid="15hq55k"
                >
                  <span data-oid="952j456">{goal.name}</span>
                  <span data-oid="4pccp1t">
                    ${goal.current.toLocaleString()} / $
                    {goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  data-oid="8l.m3j8"
                />

                <p
                  className="text-xs text-right text-muted-foreground"
                  data-oid="_0.qnb6"
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
