import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const recentTransactions = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    amount: "+$350.00",
    status: "success",
    date: "2023-07-20",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    amount: "-$120.50",
    status: "pending",
    date: "2023-07-19",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    amount: "+$1,000.00",
    status: "success",
    date: "2023-07-18",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: "4",
    name: "Diana Martinez",
    email: "diana@example.com",
    amount: "-$50.75",
    status: "failed",
    date: "2023-07-17",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: "5",
    name: "Ethan Williams",
    email: "ethan@example.com",
    amount: "+$720.00",
    status: "success",
    date: "2023-07-16",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
];

export function RecentTransactions() {
  return (
    <div className="space-y-4" data-oid="cxt890o">
      {recentTransactions.map((transaction) => (
        <Card key={transaction.id} className="p-4" data-oid="h.dgu.z">
          <CardContent className="flex items-center p-0" data-oid="enu:63l">
            <Avatar className="h-10 w-10" data-oid="pnbl5pn">
              <AvatarImage
                src={transaction.avatar}
                alt={transaction.name}
                data-oid="whx5qwu"
              />

              <AvatarFallback data-oid="po55s9q">
                {transaction.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1 space-y-1" data-oid="juigxjh">
              <p
                className="text-sm font-medium leading-none"
                data-oid="jb13abb"
              >
                {transaction.name}
              </p>
              <p className="text-xs text-muted-foreground" data-oid="6:eh94c">
                {transaction.email}
              </p>
            </div>
            <div className="ml-auto text-right" data-oid="ric2_hb">
              <p
                className={`text-sm font-medium ${transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                data-oid="jgb_x:w"
              >
                {transaction.amount}
              </p>
              <p className="text-xs text-muted-foreground" data-oid="pnpmyiz">
                {transaction.date}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
