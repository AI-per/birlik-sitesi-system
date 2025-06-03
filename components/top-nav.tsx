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
      data-oid="j6g.v9f"
    >
      <div
        className="container flex h-16 items-center justify-between px-4 md:px-6"
        data-oid="addm.yq"
      >
        <div className="hidden md:block" data-oid="9ddd631">
          <nav className="flex items-center space-x-2" data-oid="wsccsz5">
            <Link href="/" className="text-sm font-medium" data-oid=".oua00p">
              Home
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span className="text-muted-foreground" data-oid="fdxjv6s">
                  /
                </span>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  className="text-sm font-medium"
                  data-oid="7gax112"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4" data-oid="t50qv14">
          <Notifications data-oid="th3njyq" />
          <ThemeToggle data-oid="ej3x00." />
          <DropdownMenu data-oid="-qwne4a">
            <DropdownMenuTrigger asChild data-oid="4a6gwfz">
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                data-oid="tkl1xp3"
              >
                <Avatar className="h-8 w-8" data-oid="b.0xr2y">
                  <AvatarImage
                    src={settings.avatar}
                    alt={settings.fullName}
                    data-oid="yb.-a6g"
                  />

                  <AvatarFallback data-oid="s4vcsmy">
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
              data-oid="5zist4b"
            >
              <DropdownMenuLabel className="font-normal" data-oid="adpe1sk">
                <div className="flex flex-col space-y-1" data-oid="4dg-3-t">
                  <p
                    className="text-sm font-medium leading-none"
                    data-oid="cea41se"
                  >
                    {settings.fullName}
                  </p>
                  <p
                    className="text-xs leading-none text-muted-foreground"
                    data-oid="swzzrbz"
                  >
                    {settings.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator data-oid="i3fp-qj" />
              <DropdownMenuItem asChild data-oid="fwn9o.k">
                <Link href="/settings" data-oid="8d5m7gu">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-oid="lffz551">
                <Link href="/settings" data-oid="c9tz-xt">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="cywskl1">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
