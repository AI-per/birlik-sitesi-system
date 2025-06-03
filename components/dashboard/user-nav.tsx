"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import Link from "next/link";

export function UserNav() {
  // Örnek kullanıcı bilgileri
  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    image: "/placeholder.svg?height=32&width=32",
  };

  return (
    <DropdownMenu data-oid="65-erve">
      <DropdownMenuTrigger asChild data-oid="6wtkyto">
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          data-oid="st:b65k"
        >
          <Avatar className="h-8 w-8" data-oid="5okapoo">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
              data-oid="t87s.jm"
            />

            <AvatarFallback data-oid="zg93lh5">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        data-oid="toqz.9p"
      >
        <DropdownMenuLabel className="font-normal" data-oid="0eij8_n">
          <div className="flex flex-col space-y-1" data-oid="e:1sg5e">
            <p className="text-sm font-medium leading-none" data-oid="_q7adhj">
              {user.name}
            </p>
            <p
              className="text-xs leading-none text-muted-foreground"
              data-oid="-3.sd1s"
            >
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="wur1.si" />
        <DropdownMenuGroup data-oid="v5ves:t">
          <DropdownMenuItem asChild data-oid="y5m9y3v">
            <Link href="/dashboard/profile" data-oid="w82iit2">
              <Icons.user className="mr-2 h-4 w-4" data-oid="21s-8oe" />
              <span data-oid="ckbsr4_">Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild data-oid="7jemnmb">
            <Link href="/dashboard/settings" data-oid="a1juixk">
              <Icons.settings className="mr-2 h-4 w-4" data-oid="lugy79d" />
              <span data-oid="38-fskm">Ayarlar</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator data-oid="ubfev:6" />
        <DropdownMenuItem asChild data-oid="neusx4z">
          <Link href="/" data-oid="_f5bkmn">
            <Icons.logout className="mr-2 h-4 w-4" data-oid="tme8vyq" />
            <span data-oid="i9jrxvt">Çıkış Yap</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
