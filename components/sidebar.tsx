"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  Wallet,
  Receipt,
  CreditCard,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Bloklar", href: "/dashboard/blocks", icon: Building2 },
  { name: "Daireler", href: "/dashboard/apartments", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Organization", href: "/organization", icon: Building2 },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Members", href: "/members", icon: Users2 },
  { name: "Permissions", href: "/permissions", icon: Shield },
  { name: "Chat", href: "/chat", icon: MessagesSquare },
  { name: "Meetings", href: "/meetings", icon: Video },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavItem = ({ item, isBottom = false }: { item: any; isBottom?: boolean }) => (
    <Tooltip delayDuration={0} data-oid="kblieix">
      <TooltipTrigger asChild data-oid="-dmm7qh">
        <Link
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            isCollapsed && "justify-center px-2",
          )}
          data-oid="-ol_5j6"
        >
          <item.icon
            className={cn("h-4 w-4", !isCollapsed && "mr-3")}
            data-oid="_bql291"
          />

          {!isCollapsed && <span data-oid="9uvoexa">{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent
          side="right"
          className="flex items-center gap-4"
          data-oid="1sij1lr"
        >
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <TooltipProvider data-oid="42q-v:e">
      <>
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
          data-oid="akvjcpx"
        >
          <Menu className="h-6 w-6" data-oid="_elhxmm" />
        </button>
        <div
          className={cn(
            "fixed inset-y-0 z-20 flex flex-col bg-background transition-all duration-300 ease-in-out lg:static",
            isCollapsed ? "w-[72px]" : "w-72",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
          data-oid="miznmeo"
        >
          <div className="border-b border-border" data-oid="ach18-0">
            <div
              className={cn(
                "flex h-16 items-center gap-2 px-4",
                isCollapsed && "justify-center px-2",
              )}
              data-oid="aw5-m8c"
            >
              {!isCollapsed && (
                <Link
                  href="/"
                  className="flex items-center font-semibold"
                  data-oid="k-p4wr3"
                >
                  <span className="text-lg" data-oid="iy6rs3z">
                    Flowers&Saints
                  </span>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={cn("ml-auto h-8 w-8", isCollapsed && "ml-0")}
                onClick={() => setIsCollapsed(!isCollapsed)}
                data-oid="s8icjuk"
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCollapsed && "rotate-180",
                  )}
                  data-oid="sm:5ncg"
                />

                <span className="sr-only" data-oid="r:oyc2p">
                  {isCollapsed ? "Expand" : "Collapse"} Sidebar
                </span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto" data-oid=".rhcv7i">
            <nav className="flex-1 space-y-1 px-2 py-4" data-oid="k-j76xj">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} data-oid="g_3ka87" />
              ))}
            </nav>
          </div>
          <div className="border-t border-border p-2" data-oid="fgxvxjo">
            <nav className="space-y-1" data-oid="_bnf_jk">
              {bottomNavigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isBottom
                  data-oid="ncp_l13"
                />
              ))}
            </nav>
          </div>
        </div>
      </>
    </TooltipProvider>
  );
}
