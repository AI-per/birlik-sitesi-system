import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const budgetCategories = [
  { name: "Housing", spent: 2000, budget: 2500 },
  { name: "Transportation", spent: 450, budget: 500 },
  { name: "Food", spent: 800, budget: 1000 },
  { name: "Utilities", spent: 300, budget: 350 },
  { name: "Entertainment", spent: 250, budget: 300 },
];

export function BudgetTracker() {
  const totalBudget = budgetCategories.reduce(
    (sum, category) => sum + category.budget,
    0,
  );
  const totalSpent = budgetCategories.reduce(
    (sum, category) => sum + category.spent,
    0,
  );
  const overallPercentage = (totalSpent / totalBudget) * 100;

  return (
    <Card data-oid=":t7ed-o">
      <CardHeader data-oid="o2rry6w">
        <CardTitle data-oid="06.k0oi">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent data-oid="cbk88n5">
        <div className="space-y-4" data-oid="wt0-jh_">
          <div className="flex justify-between items-center" data-oid="g38ltiu">
            <span className="text-sm font-medium" data-oid=".o9mjcg">
              Total Spent
            </span>
            <span className="text-sm font-medium" data-oid="j36lkp1">
              ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress
            value={overallPercentage}
            className="h-2"
            data-oid="ylg.eo0"
          />

          <p
            className="text-sm text-muted-foreground text-right"
            data-oid="ntb7f3l"
          >
            {overallPercentage.toFixed(1)}% of budget used
          </p>

          <div className="space-y-2" data-oid="11ahx6w">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100;
              return (
                <div
                  key={category.name}
                  className="grid grid-cols-3 gap-2 items-center"
                  data-oid="intzv-:"
                >
                  <span className="text-sm font-medium" data-oid="f-ukgmq">
                    {category.name}
                  </span>
                  <Progress
                    value={percentage}
                    className="h-1.5"
                    data-oid="r8xf:.."
                  />

                  <span
                    className="text-sm text-muted-foreground text-right"
                    data-oid="ziuwybb"
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
