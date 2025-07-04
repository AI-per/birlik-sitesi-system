"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
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
import { toast } from "@/components/ui/use-toast";

export function UserNav() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      toast({
        title: "Çıkış yapılıyor...",
        description: "Oturumunuz sonlandırılıyor.",
      });
      
      const result = await signOut({ 
        redirect: false,
        callbackUrl: "/" 
      });
      
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
      });
      
      window.location.href = "/";
    }
  };

  if (!user) {
    return (
      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    );
  }

  return (
    <DropdownMenu data-oid="0_m-v3j">
      <DropdownMenuTrigger asChild data-oid="o6mjh8p">
        <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-oid="jdtb28s">
          <Avatar className="h-8 w-8" data-oid="5tpmcdq">
            <AvatarImage src={user.image} alt={user.name} data-oid="7.8rpno" />
            <AvatarFallback data-oid="kjcpjkk">
              {user.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
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
        <DropdownMenuItem onClick={handleLogout} data-oid="aolcaez">
          <Icons.logout className="mr-2 h-4 w-4" data-oid="i_34rcy" />
          <span data-oid="p6v.x2f">Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
