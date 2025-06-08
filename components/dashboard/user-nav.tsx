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
    <DropdownMenu data-oid=".hwx52m">
      <DropdownMenuTrigger asChild data-oid="16l0w8b">
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          data-oid="auw3xdn"
        >
          <Avatar className="h-8 w-8" data-oid="wh29ndf">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
              data-oid="1i5:qmr"
            />

            <AvatarFallback data-oid="ttnsdqp">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        data-oid="wdkbjy7"
      >
        <DropdownMenuLabel className="font-normal" data-oid="2y28po:">
          <div className="flex flex-col space-y-1" data-oid="qm-hxzm">
            <p className="text-sm font-medium leading-none" data-oid="d-.:t0k">
              {user.name}
            </p>
            <p
              className="text-xs leading-none text-muted-foreground"
              data-oid="-ranztj"
            >
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="ahkmbnh" />
        <DropdownMenuGroup data-oid="36w0a__">
          <DropdownMenuItem asChild data-oid="whr2k2x">
            <Link href="/dashboard/profile" data-oid="r894_4a">
              <Icons.user className="mr-2 h-4 w-4" data-oid=":xfj2c2" />
              <span data-oid="hlnur-2">Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild data-oid="gej_nef">
            <Link href="/dashboard/settings" data-oid="ehuwc.m">
              <Icons.settings className="mr-2 h-4 w-4" data-oid="rpt59l3" />
              <span data-oid="yza486v">Ayarlar</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator data-oid="8i1e8jk" />
        <DropdownMenuItem asChild data-oid="aolcaez">
          <Link href="/" data-oid="1k6lnja">
            <Icons.logout className="mr-2 h-4 w-4" data-oid="i_34rcy" />
            <span data-oid="p6v.x2f">Çıkış Yap</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
