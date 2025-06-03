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
    <DropdownMenu data-oid="w0tkn7n">
      <DropdownMenuTrigger asChild data-oid="rj_w.02">
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          data-oid="euccv4o"
        >
          <Avatar className="h-8 w-8" data-oid="x8s7gxg">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
              data-oid="z8djgi_"
            />

            <AvatarFallback data-oid="z7pxdrq">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        data-oid="cz_xuw6"
      >
        <DropdownMenuLabel className="font-normal" data-oid="k1tdhm.">
          <div className="flex flex-col space-y-1" data-oid="_wc3491">
            <p className="text-sm font-medium leading-none" data-oid="qpf5:0u">
              {user.name}
            </p>
            <p
              className="text-xs leading-none text-muted-foreground"
              data-oid="ejy2ojh"
            >
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="w5zwia4" />
        <DropdownMenuGroup data-oid=":5wrflh">
          <DropdownMenuItem asChild data-oid="sxtsx-:">
            <Link href="/dashboard/profile" data-oid="r2m0m7a">
              <Icons.user className="mr-2 h-4 w-4" data-oid="y0q:-jz" />
              <span data-oid=".l0vbjt">Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild data-oid="hd80tmd">
            <Link href="/dashboard/settings" data-oid="s6ifi4k">
              <Icons.settings className="mr-2 h-4 w-4" data-oid="8rkqtvv" />
              <span data-oid="7g1mg4j">Ayarlar</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator data-oid="d-2xh_1" />
        <DropdownMenuItem asChild data-oid="o0mlr88">
          <Link href="/" data-oid="g3lz9nn">
            <Icons.logout className="mr-2 h-4 w-4" data-oid="bt:yl6e" />
            <span data-oid="v7mc:x8">Çıkış Yap</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
