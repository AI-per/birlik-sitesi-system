import { CheckCircle2 } from "lucide-react";

const topProducts = [
  { name: "Savings Account", revenue: "$1,200,000", growth: "+12%" },
  { name: "Credit Card", revenue: "$980,000", growth: "+8%" },
  { name: "Personal Loan", revenue: "$850,000", growth: "+15%" },
  { name: "Mortgage", revenue: "$2,300,000", growth: "+5%" },
  { name: "Investment Fund", revenue: "$1,800,000", growth: "+20%" },
];

export function TopProducts() {
  return (
    <div className="space-y-8" data-oid="-vut4gz">
      {topProducts.map((product) => (
        <div
          key={product.name}
          className="flex items-center"
          data-oid="rlwiodt"
        >
          <CheckCircle2
            className="mr-2 h-4 w-4 text-muted-foreground"
            data-oid="2e3ud54"
          />

          <div className="ml-4 space-y-1" data-oid="ctxikli">
            <p className="text-sm font-medium leading-none" data-oid="-gxnu4i">
              {product.name}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="b-l1wzi">
              {product.revenue}
            </p>
          </div>
          <div
            className="ml-auto font-medium text-green-500"
            data-oid="ccf..v."
          >
            {product.growth}
          </div>
        </div>
      ))}
    </div>
  );
}
