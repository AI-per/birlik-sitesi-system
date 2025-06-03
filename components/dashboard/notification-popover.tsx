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
    <Popover open={isOpen} onOpenChange={setIsOpen} data-oid=".xvj.fe">
      <PopoverTrigger asChild data-oid="8--z2p4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          data-oid="tzwenh1"
        >
          <Icons.bell className="h-5 w-5" data-oid="ut-rez8" />
          {notifications.some((n) => !n.read) && (
            <span
              className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
              data-oid="ctro5ze"
            />
          )}
          <span className="sr-only" data-oid="jc192yk">
            Bildirimleri göster
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" data-oid="tdsiusq">
        <div
          className="flex items-center justify-between border-b p-3"
          data-oid="g8_ge9y"
        >
          <h4 className="font-medium" data-oid="j4lulty">
            Bildirimler
          </h4>
          <Button variant="ghost" size="sm" data-oid="x90::go">
            Tümünü okundu işaretle
          </Button>
        </div>
        <ScrollArea className="h-80" data-oid="ci9wwev">
          <div className="flex flex-col gap-1 p-1" data-oid="eys4yci">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent",
                    !notification.read && "bg-muted",
                  )}
                  data-oid="r9v95t:"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="6b1x68_"
                  >
                    <p className="font-medium" data-oid="oqwzir_">
                      {notification.title}
                    </p>
                    <p
                      className="text-xs text-muted-foreground"
                      data-oid="hswkr:j"
                    >
                      {notification.time}
                    </p>
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    data-oid="hghf271"
                  >
                    {notification.description}
                  </p>
                </button>
              ))
            ) : (
              <div
                className="p-8 text-center text-muted-foreground"
                data-oid="ea:quu_"
              >
                Bildirim bulunmuyor
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-2" data-oid="l3qnk07">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            data-oid="ejbqy4i"
          >
            Tüm bildirimleri gör
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
