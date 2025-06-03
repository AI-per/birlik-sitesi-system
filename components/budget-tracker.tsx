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
    <Card data-oid="z-0p4ng">
      <CardHeader data-oid="u2e.x:m">
        <CardTitle data-oid="umykp2b">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent data-oid="g.qs8vh">
        <div className="space-y-4" data-oid=".flpa1.">
          <div className="flex justify-between items-center" data-oid="u4znc1:">
            <span className="text-sm font-medium" data-oid="4gq26n5">
              Total Spent
            </span>
            <span className="text-sm font-medium" data-oid="dzrc8z0">
              ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress
            value={overallPercentage}
            className="h-2"
            data-oid="8:--05s"
          />

          <p
            className="text-sm text-muted-foreground text-right"
            data-oid=":ip9db8"
          >
            {overallPercentage.toFixed(1)}% of budget used
          </p>

          <div className="space-y-2" data-oid="-lpdkl2">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100;
              return (
                <div
                  key={category.name}
                  className="grid grid-cols-3 gap-2 items-center"
                  data-oid="kqe9qfa"
                >
                  <span className="text-sm font-medium" data-oid="o:crc4q">
                    {category.name}
                  </span>
                  <Progress
                    value={percentage}
                    className="h-1.5"
                    data-oid="ljh2t6f"
                  />

                  <span
                    className="text-sm text-muted-foreground text-right"
                    data-oid="_jp3n7j"
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
