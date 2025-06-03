"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  // Örnek bildirimler
  const notifications = [
    {
      id: "1",
      title: "Yeni Duyuru",
      description: "Bahçe düzenlemesi hakkında yeni bir duyuru yayınlandı.",
      time: "5 dakika önce",
      read: false,
    },
    {
      id: "2",
      title: "Aidat Hatırlatması",
      description: "Mayıs ayı aidatınızın son ödeme tarihi yaklaşıyor.",
      time: "2 saat önce",
      read: false,
    },
    {
      id: "3",
      title: "Ödeme Onayı",
      description: "Nisan ayı aidat ödemeniz onaylandı.",
      time: "1 gün önce",
      read: true,
    },
    {
      id: "4",
      title: "Sistem Bakımı",
      description:
        "Sistem bakımı nedeniyle yarın 02:00-04:00 arası hizmet verilmeyecektir.",
      time: "2 gün önce",
      read: true,
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.bell className="h-5 w-5" />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
          <span className="sr-only">Bildirimleri göster</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Bildirimler</h4>
          <Button variant="ghost" size="sm">
            Tümünü okundu işaretle
          </Button>
        </div>
        <ScrollArea className="h-80">
          <div className="flex flex-col gap-1 p-1">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent",
                    !notification.read && "bg-muted",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Bildirim bulunmuyor
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center">
            Tüm bildirimleri gör
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
