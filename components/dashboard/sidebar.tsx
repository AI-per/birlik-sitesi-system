"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { useSidebar } from "@/components/sidebar-provider";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const routes = [
    {
      label: "Genel Bakış",
      icon: Icons.home,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Bloklar",
      icon: Icons.building,
      href: "/dashboard/blocks",
      color: "text-violet-500",
    },
    {
      label: "Daireler",
      icon: Icons.home,
      href: "/dashboard/apartments",
      color: "text-pink-500",
    },
    {
      label: "Kullanıcılar",
      icon: Icons.users,
      href: "/dashboard/users",
      color: "text-orange-500",
    },
    {
      label: "Duyurular",
      icon: Icons.bell,
      href: "/dashboard/announcements",
      color: "text-emerald-500",
    },
    {
      label: "Aidatlar",
      icon: Icons.dollar,
      href: "/dashboard/dues",
      color: "text-blue-500",
    },
    {
      label: "Ödemeler",
      icon: Icons.billing,
      href: "/dashboard/payments",
      color: "text-green-500",
    },
    {
      label: "İletişim",
      icon: Icons.message,
      href: "/dashboard/contact",
      color: "text-yellow-500",
    },
    {
      label: "Raporlar",
      icon: Icons.chart,
      href: "/dashboard/reports",
      color: "text-red-500",
    },
    {
      label: "Ayarlar",
      icon: Icons.settings,
      href: "/dashboard/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-background transition-transform lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
      data-oid="04yr-fn"
    >
      <div className="flex h-14 items-center border-b px-4" data-oid="m2mw73h">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          data-oid="iuedr76"
        >
          <Icons.building className="h-6 w-6" data-oid="qz-9.rd" />
          <span data-oid="b8zoqwz">Site Yönetim</span>
        </Link>
      </div>
      <ScrollArea className="flex-1" data-oid="w81:klw">
        <div className="flex flex-col gap-1 p-2" data-oid="cu09-:v">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === route.href && "bg-muted",
              )}
              asChild
              data-oid="ph23zzz"
            >
              <Link href={route.href} data-oid="1_cqu97">
                <route.icon
                  className={cn("mr-2 h-5 w-5", route.color)}
                  data-oid="6.hzh6:"
                />

                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t" data-oid="i07n0_-">
        <Button
          variant="ghost"
          className="w-full justify-start"
          asChild
          data-oid="1a4gfvi"
        >
          <Link href="/" data-oid="4w6sk3-">
            <Icons.logout
              className="mr-2 h-5 w-5 text-red-500"
              data-oid="9_zp1p5"
            />
            Çıkış Yap
          </Link>
        </Button>
      </div>
    </div>
  );
}
