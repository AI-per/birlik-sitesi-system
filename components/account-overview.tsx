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
    <Card className="border border-border" data-oid="8qvi_x.">
      <CardHeader data-oid="xmm97re">
        <CardTitle className="text-lg font-medium" data-oid="h3fs8z9">
          Account Overview
        </CardTitle>
      </CardHeader>
      <CardContent data-oid="dz8bm05">
        <div className="text-2xl font-semibold mb-4" data-oid="p:h1xsk">
          ${totalBalance.toFixed(2)}
        </div>
        <div className="space-y-2" data-oid="p6we39u">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="acg6m9r"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="lm0u8vr"
              >
                {account.name}
              </span>
              <span className="font-medium" data-oid="kjnx00k">
                ${account.balance.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
