"use client";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/contexts/settings-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

export function TopNav() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const { settings } = useSettings();

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background"
      data-oid=":s7ugbr"
    >
      <div
        className="container flex h-16 items-center justify-between px-4 md:px-6"
        data-oid="ppevki-"
      >
        <div className="hidden md:block" data-oid="-3d12hk">
          <nav className="flex items-center space-x-2" data-oid="r.ywzbx">
            <Link href="/" className="text-sm font-medium" data-oid="xqw_-8q">
              Home
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span className="text-muted-foreground" data-oid="oe0y0w.">
                  /
                </span>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  className="text-sm font-medium"
                  data-oid="-c99bbq"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4" data-oid="06txq0u">
          <Notifications data-oid="1a_58cn" />
          <ThemeToggle data-oid="qlyypfs" />
          <DropdownMenu data-oid="n5wm8gu">
            <DropdownMenuTrigger asChild data-oid="a2-bjec">
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                data-oid="v.ndd8i"
              >
                <Avatar className="h-8 w-8" data-oid="48vou8y">
                  <AvatarImage
                    src={settings.avatar}
                    alt={settings.fullName}
                    data-oid="sed2s.:"
                  />

                  <AvatarFallback data-oid="q1zqjto">
                    {settings.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              forceMount
              data-oid="wmygd0v"
            >
              <DropdownMenuLabel className="font-normal" data-oid="u45v0a-">
                <div className="flex flex-col space-y-1" data-oid="mky2wq2">
                  <p
                    className="text-sm font-medium leading-none"
                    data-oid="m640lzm"
                  >
                    {settings.fullName}
                  </p>
                  <p
                    className="text-xs leading-none text-muted-foreground"
                    data-oid="bppvtxe"
                  >
                    {settings.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator data-oid="o08k7mh" />
              <DropdownMenuItem asChild data-oid="q.ygwl2">
                <Link href="/settings" data-oid="256ie8c">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-oid="sih:tul">
                <Link href="/settings" data-oid="bvqywyn">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="aboclwc">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
