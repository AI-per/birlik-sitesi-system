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
    <DropdownMenu data-oid="-yw-xoq">
      <DropdownMenuTrigger asChild data-oid="fur-d-o">
        <Button variant="ghost" size="icon" data-oid="hpsr_7l">
          <Icons.sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            data-oid="82x-d8b"
          />

          <Icons.moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            data-oid="dagl0-k"
          />

          <span className="sr-only" data-oid="ar1jeal">
            Tema değiştir
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="vrj24k2">
        <DropdownMenuItem onClick={() => setTheme("light")} data-oid="6pjerv7">
          <Icons.sun className="mr-2 h-4 w-4" data-oid="w-4eohf" />
          <span data-oid="few6nzn">Açık</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} data-oid="10tg5qa">
          <Icons.moon className="mr-2 h-4 w-4" data-oid="wclpd2." />
          <span data-oid="0eyrvhi">Koyu</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} data-oid="c_sotn2">
          <Icons.laptop className="mr-2 h-4 w-4" data-oid="urf_..b" />
          <span data-oid="u.ttpjr">Sistem</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
