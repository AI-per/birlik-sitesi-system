"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useSidebar } from "@/components/sidebar-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/dashboard/user-nav";

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6"
      data-oid="extq8v4"
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggle}
        data-oid="rv7y1ll"
      >
        <Icons.menu className="h-6 w-6" data-oid="e:stmk5" />
        <span className="sr-only" data-oid="c9rhi3:">
          Toggle Menu
        </span>
      </Button>
      <div className="flex-1" data-oid="3ra.co8" />
      <div className="flex items-center gap-2" data-oid="ua1o63e">
        <ModeToggle data-oid="t:h7f-4" />
        <UserNav data-oid="0-irhjm" />
      </div>
    </header>
  );
}
