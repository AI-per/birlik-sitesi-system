"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useSidebar } from "@/components/sidebar-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/dashboard/user-nav";
import { NotificationPopover } from "@/components/dashboard/notification-popover";

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6"
      data-oid="lyiiio4"
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggle}
        data-oid="v79isp-"
      >
        <Icons.menu className="h-6 w-6" data-oid="5tvxs63" />
        <span className="sr-only" data-oid="6:m:kte">
          Toggle Menu
        </span>
      </Button>
      <div className="flex-1" data-oid="ww0hos8" />
      <div className="flex items-center gap-2" data-oid="eqpqqcs">
        <NotificationPopover data-oid="yg7l81n" />
        <ModeToggle data-oid="pf:y:_0" />
        <UserNav data-oid="gadbwmc" />
      </div>
    </header>
  );
}
