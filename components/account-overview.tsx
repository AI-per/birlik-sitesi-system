import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const accounts = [
  { name: "Checking", balance: 5240.23 },
  { name: "Savings", balance: 12750.89 },
  { name: "Investment", balance: 7890.45 },
];

export function AccountOverview() {
  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return (
    <Card className="border border-border" data-oid="hxe2_2g">
      <CardHeader data-oid="3pel9vd">
        <CardTitle className="text-lg font-medium" data-oid="k74g8ii">
          Account Overview
        </CardTitle>
      </CardHeader>
      <CardContent data-oid="4hmnj_8">
        <div className="text-2xl font-semibold mb-4" data-oid="ti-7odi">
          ${totalBalance.toFixed(2)}
        </div>
        <div className="space-y-2" data-oid="5098e.:">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="ulnwmt5"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="pkin27r"
              >
                {account.name}
              </span>
              <span className="font-medium" data-oid="vr.fsg2">
                ${account.balance.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
