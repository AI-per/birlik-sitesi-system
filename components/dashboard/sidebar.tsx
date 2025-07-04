"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { useSidebar } from "@/components/sidebar-provider";
import { signOut, useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      toast({
        title: "Çıkış yapılıyor...",
        description: "Oturumunuz sonlandırılıyor.",
      });
      
      // Use signOut with explicit redirect to homepage
      const result = await signOut({ 
        redirect: false, // Handle redirect manually for better control
        callbackUrl: "/" 
      });
      
      // Force redirect to homepage
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
      });
      
      // Even if there's an error, try to redirect to homepage
      window.location.href = "/";
    }
  };

  // Get user role from session
  const userRole = session?.user?.role;
  const isRestricted = userRole === 'RESIDENT' || userRole === 'LANDLORD';

  const routes = [
    {
      label: "Genel Bakış",
      icon: Icons.home,
      href: "/dashboard",
      color: "text-sky-500",
      visible: true, // Always visible
    },
    {
      label: "Bloklar",
      icon: Icons.building,
      href: "/dashboard/blocks",
      color: "text-violet-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Daireler",
      icon: Icons.home,
      href: "/dashboard/apartments",
      color: "text-pink-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Kullanıcılar",
      icon: Icons.users,
      href: "/dashboard/users",
      color: "text-orange-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Duyurular",
      icon: Icons.bell,
      href: "/dashboard/announcements",
      color: "text-emerald-500",
      visible: true, // Always visible (but with restricted actions)
    },
    {
      label: "Aidatlar",
      icon: Icons.dollar,
      href: "/dashboard/dues",
      color: "text-blue-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Toplu İçe Aktarım",
      icon: Icons.upload,
      href: "/dashboard/bulk-import",
      color: "text-purple-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Ödemeler",
      icon: Icons.billing,
      href: "/dashboard/payments",
      color: "text-green-500",
      visible: true, // Always visible
    },
    {
      label: "İletişim",
      icon: Icons.message,
      href: "/dashboard/contact",
      color: "text-yellow-500",
      visible: true, // Always visible
    },
    {
      label: "Raporlar",
      icon: Icons.chart,
      href: "/dashboard/reports",
      color: "text-red-500",
      visible: !isRestricted, // Hidden for RESIDENT and LANDLORD
    },
    {
      label: "Ayarlar",
      icon: Icons.settings,
      href: "/dashboard/settings",
      color: "text-gray-500",
      visible: true, // Always visible (but with restricted functionality)
    },
  ];

  // Filter routes based on visibility
  const visibleRoutes = routes.filter(route => route.visible);

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-background transition-transform lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
      data-oid="c.0m218"
    >
      <div className="flex h-14 items-center border-b px-4" data-oid="fyx8jwk">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          data-oid="3g.oui6"
        >
          <Icons.building className="h-6 w-6" data-oid="7y43q4i" />
          <span data-oid="6ucqqub">Site Yönetim</span>
        </Link>
      </div>
      <ScrollArea className="flex-1" data-oid="2pb0-hi">
        <div className="flex flex-col gap-1 p-2" data-oid="ybr:n9g">
          {visibleRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === route.href && "bg-muted",
              )}
              asChild
              data-oid="3u4mcyc"
            >
              <Link href={route.href} data-oid="ma.71yh">
                <route.icon
                  className={cn("mr-2 h-5 w-5", route.color)}
                  data-oid="8_3ytv5"
                />

                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t" data-oid="xgaqmkm">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
          data-oid="mr9g9-o"
        >
          <Icons.logout
            className="mr-2 h-5 w-5 text-red-500"
            data-oid="9jdirc5"
          />
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
}
