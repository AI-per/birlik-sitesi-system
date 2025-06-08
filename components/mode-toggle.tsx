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
    <DropdownMenu data-oid="e6l8o0j">
      <DropdownMenuTrigger asChild data-oid=":l84180">
        <Button variant="ghost" size="icon" data-oid="2.trvg-">
          <Icons.sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            data-oid="81wz_h8"
          />

          <Icons.moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            data-oid="kjmbhis"
          />

          <span className="sr-only" data-oid="mtu.zda">
            Tema değiştir
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="2al:gv8">
        <DropdownMenuItem onClick={() => setTheme("light")} data-oid="z-o3ylb">
          <Icons.sun className="mr-2 h-4 w-4" data-oid="qjdsmei" />
          <span data-oid="sp554h1">Açık</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} data-oid="hq3i7px">
          <Icons.moon className="mr-2 h-4 w-4" data-oid="hiqxtu8" />
          <span data-oid="mwvutd-">Koyu</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} data-oid="5_yck-h">
          <Icons.laptop className="mr-2 h-4 w-4" data-oid="kd_rz77" />
          <span data-oid="5xrlu18">Sistem</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
