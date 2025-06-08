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
      data-oid="qcqnl_u"
    >
      <div
        className="container flex h-16 items-center justify-between px-4 md:px-6"
        data-oid="inc-1wh"
      >
        <div className="hidden md:block" data-oid="2ibm70l">
          <nav className="flex items-center space-x-2" data-oid="ots_ta9">
            <Link href="/" className="text-sm font-medium" data-oid="_yampl.">
              Home
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span className="text-muted-foreground" data-oid="0rtsept">
                  /
                </span>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  className="text-sm font-medium"
                  data-oid="nhf1uro"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4" data-oid="ohq:u2z">
          <Notifications data-oid="x5jis2l" />
          <ThemeToggle data-oid="yz09-:l" />
          <DropdownMenu data-oid="6lq6nw.">
            <DropdownMenuTrigger asChild data-oid="mrogiio">
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                data-oid="lp2fg4z"
              >
                <Avatar className="h-8 w-8" data-oid="2:kfr38">
                  <AvatarImage
                    src={settings.avatar}
                    alt={settings.fullName}
                    data-oid="05s6xtf"
                  />

                  <AvatarFallback data-oid="4gyrts2">
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
              data-oid="ys6stb5"
            >
              <DropdownMenuLabel className="font-normal" data-oid="98.t1tk">
                <div className="flex flex-col space-y-1" data-oid="hz4p45t">
                  <p
                    className="text-sm font-medium leading-none"
                    data-oid="g31p:fv"
                  >
                    {settings.fullName}
                  </p>
                  <p
                    className="text-xs leading-none text-muted-foreground"
                    data-oid="v7y7y:3"
                  >
                    {settings.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator data-oid="xhvmfez" />
              <DropdownMenuItem asChild data-oid="6ghfij1">
                <Link href="/settings" data-oid="xr1mgrr">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-oid="jax56:i">
                <Link href="/settings" data-oid="utrmyd8">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="55nt7i_">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
