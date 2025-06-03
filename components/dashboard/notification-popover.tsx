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
    <Popover open={isOpen} onOpenChange={setIsOpen} data-oid="1_jiy1s">
      <PopoverTrigger asChild data-oid="1kzsdaq">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          data-oid="43xgcb_"
        >
          <Icons.bell className="h-5 w-5" data-oid="sqymlem" />
          {notifications.some((n) => !n.read) && (
            <span
              className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
              data-oid="kgiyeyd"
            />
          )}
          <span className="sr-only" data-oid="yw5:c2o">
            Bildirimleri göster
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" data-oid="9e2econ">
        <div
          className="flex items-center justify-between border-b p-3"
          data-oid="5v_wd0i"
        >
          <h4 className="font-medium" data-oid="gvgh2x6">
            Bildirimler
          </h4>
          <Button variant="ghost" size="sm" data-oid="mc0bt3j">
            Tümünü okundu işaretle
          </Button>
        </div>
        <ScrollArea className="h-80" data-oid="7wlms-o">
          <div className="flex flex-col gap-1 p-1" data-oid="ain6cqk">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent",
                    !notification.read && "bg-muted",
                  )}
                  data-oid="s0zb_mi"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="uoltrc."
                  >
                    <p className="font-medium" data-oid="fn_-6af">
                      {notification.title}
                    </p>
                    <p
                      className="text-xs text-muted-foreground"
                      data-oid="l79munr"
                    >
                      {notification.time}
                    </p>
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    data-oid="senxg2k"
                  >
                    {notification.description}
                  </p>
                </button>
              ))
            ) : (
              <div
                className="p-8 text-center text-muted-foreground"
                data-oid="-0e79fi"
              >
                Bildirim bulunmuyor
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-2" data-oid="scitodq">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            data-oid="pjywb19"
          >
            Tüm bildirimleri gör
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
