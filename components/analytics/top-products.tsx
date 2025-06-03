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
    <div className="space-y-8" data-oid="zcc93ja">
      {topProducts.map((product) => (
        <div
          key={product.name}
          className="flex items-center"
          data-oid="zki4mx3"
        >
          <CheckCircle2
            className="mr-2 h-4 w-4 text-muted-foreground"
            data-oid="_9ixxut"
          />

          <div className="ml-4 space-y-1" data-oid=".i.4znj">
            <p className="text-sm font-medium leading-none" data-oid="iyjdub0">
              {product.name}
            </p>
            <p className="text-sm text-muted-foreground" data-oid="nbs6dub">
              {product.revenue}
            </p>
          </div>
          <div
            className="ml-auto font-medium text-green-500"
            data-oid="-e0kes2"
          >
            {product.growth}
          </div>
        </div>
      ))}
    </div>
  );
}
