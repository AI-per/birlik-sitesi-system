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
    <Card className="border border-border" data-oid="j45zzed">
      <CardHeader data-oid="yfkshrp">
        <CardTitle className="text-lg font-medium" data-oid="k2fk28v">
          Account Overview
        </CardTitle>
      </CardHeader>
      <CardContent data-oid="3.sdk0-">
        <div className="text-2xl font-semibold mb-4" data-oid="3p:2uu_">
          ${totalBalance.toFixed(2)}
        </div>
        <div className="space-y-2" data-oid="io36g.o">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="2ii7o9h"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="f7r1d:_"
              >
                {account.name}
              </span>
              <span className="font-medium" data-oid="sw-g.tv">
                ${account.balance.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
