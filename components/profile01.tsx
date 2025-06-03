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
    <DropdownMenu data-oid="4_u0i06">
      <DropdownMenuTrigger className="flex items-center" data-oid="vc7cmc_">
        <Avatar className="h-8 w-8" data-oid="vb7zhwd">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            data-oid="eg1uiv-"
          />

          <AvatarFallback data-oid="z2_bh4x">CN</AvatarFallback>
        </Avatar>
        <ChevronDown className="ml-2 w-4 h-4" data-oid="my_6y3." />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid=":kauwbj">
        <DropdownMenuLabel data-oid="rn3-li7">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="wu59ut:" />
        <DropdownMenuItem data-oid="t21ql5n">Profile</DropdownMenuItem>
        <DropdownMenuItem data-oid="lj1zhi6">Settings</DropdownMenuItem>
        <DropdownMenuItem data-oid="f1e:ncg">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
