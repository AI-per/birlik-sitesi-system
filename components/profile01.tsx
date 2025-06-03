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
    <DropdownMenu data-oid="vfe48c:">
      <DropdownMenuTrigger className="flex items-center" data-oid="njxhyl_">
        <Avatar className="h-8 w-8" data-oid="pfh2zhl">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            data-oid="ia:rwq4"
          />

          <AvatarFallback data-oid="l:29l_j">CN</AvatarFallback>
        </Avatar>
        <ChevronDown className="ml-2 w-4 h-4" data-oid="ydr_201" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="5xu7ur.">
        <DropdownMenuLabel data-oid="0r8o3.5">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="4gqtt9h" />
        <DropdownMenuItem data-oid="gvbt2wv">Profile</DropdownMenuItem>
        <DropdownMenuItem data-oid="96jyyj5">Settings</DropdownMenuItem>
        <DropdownMenuItem data-oid="ed8o5nb">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
