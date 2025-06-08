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
    <Card data-oid="pscez1x">
      <CardHeader data-oid="0u_o399">
        <CardTitle data-oid="55g4q:i">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent data-oid="1aerv6s">
        <div className="space-y-4" data-oid="rard:dl">
          <div className="flex justify-between items-center" data-oid="xtrk85i">
            <span className="text-sm font-medium" data-oid="ptmqs7a">
              Total Spent
            </span>
            <span className="text-sm font-medium" data-oid="r3hi.:o">
              ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress
            value={overallPercentage}
            className="h-2"
            data-oid="gsnt157"
          />

          <p
            className="text-sm text-muted-foreground text-right"
            data-oid="zqaept9"
          >
            {overallPercentage.toFixed(1)}% of budget used
          </p>

          <div className="space-y-2" data-oid="8c4-k9a">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100;
              return (
                <div
                  key={category.name}
                  className="grid grid-cols-3 gap-2 items-center"
                  data-oid="egafucy"
                >
                  <span className="text-sm font-medium" data-oid="31j.a2a">
                    {category.name}
                  </span>
                  <Progress
                    value={percentage}
                    className="h-1.5"
                    data-oid="aqznb.7"
                  />

                  <span
                    className="text-sm text-muted-foreground text-right"
                    data-oid="qbiohm4"
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
