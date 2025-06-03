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
      data-oid="0w8si0i"
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggle}
        data-oid="lyhwr09"
      >
        <Icons.menu className="h-6 w-6" data-oid=":m-2qrs" />
        <span className="sr-only" data-oid="ywx9v7.">
          Toggle Menu
        </span>
      </Button>
      <div className="flex-1" data-oid="9mh3nzq" />
      <div className="flex items-center gap-2" data-oid="9:n5_ng">
        <NotificationPopover data-oid="p-du.83" />
        <ModeToggle data-oid="9-._8ii" />
        <UserNav data-oid="9ymy_7t" />
      </div>
    </header>
  );
}
