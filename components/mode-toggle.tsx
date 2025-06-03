"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu data-oid="0oib9kx">
      <DropdownMenuTrigger asChild data-oid="g.3-tx8">
        <Button variant="ghost" size="icon" data-oid="30bw:2r">
          <Icons.sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            data-oid="qu4ltuq"
          />

          <Icons.moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            data-oid="cln8r3h"
          />

          <span className="sr-only" data-oid="kjl35u5">
            Tema değiştir
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="hr2wgsf">
        <DropdownMenuItem onClick={() => setTheme("light")} data-oid="tvt7eab">
          <Icons.sun className="mr-2 h-4 w-4" data-oid="vaf.nx1" />
          <span data-oid="_0h2tv5">Açık</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} data-oid="bgay4dr">
          <Icons.moon className="mr-2 h-4 w-4" data-oid="2ot1siv" />
          <span data-oid="9o2e9.r">Koyu</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} data-oid="iv.csvy">
          <Icons.laptop className="mr-2 h-4 w-4" data-oid="07whds_" />
          <span data-oid="rtxul44">Sistem</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
