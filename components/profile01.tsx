import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile01() {
  return (
    <DropdownMenu data-oid=":n0ok6b">
      <DropdownMenuTrigger className="flex items-center" data-oid=":00mqfe">
        <Avatar className="h-8 w-8" data-oid="r24h1-z">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            data-oid="w4p1ygb"
          />

          <AvatarFallback data-oid="byhagn3">CN</AvatarFallback>
        </Avatar>
        <ChevronDown className="ml-2 w-4 h-4" data-oid="-rjlv.q" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="w0y_jan">
        <DropdownMenuLabel data-oid="i7zmfkr">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="eb46l-j" />
        <DropdownMenuItem data-oid="n0-f4jf">Profile</DropdownMenuItem>
        <DropdownMenuItem data-oid="-2215wn">Settings</DropdownMenuItem>
        <DropdownMenuItem data-oid="s6jxl2q">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
