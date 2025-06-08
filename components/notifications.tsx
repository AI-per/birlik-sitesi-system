"use client";

import { useState } from "react";
import {
  Bell,
  X,
  Info,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: 1,
    title: "New Feature",
    message: "Check out our new budget tracking tool!",
    date: "2023-07-15",
    icon: Info,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Account Alert",
    message: "Unusual activity detected on your account.",
    date: "2023-07-14",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    id: 3,
    title: "Payment Due",
    message: "Your credit card payment is due in 3 days.",
    date: "2023-07-13",
    icon: CreditCard,
    color: "text-red-500",
  },
  {
    id: 4,
    title: "Investment Update",
    message: "Your investment portfolio has grown by 5% this month.",
    date: "2023-07-12",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    id: 5,
    title: "New Offer",
    message: "You're eligible for a new savings account with higher interest!",
    date: "2023-07-11",
    icon: Gift,
    color: "text-purple-500",
  },
];

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" data-oid=".gmfx0t">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        data-oid="_9xmryj"
      >
        <Bell className="h-5 w-5" data-oid="ji:gjdn" />
        <span
          className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
          data-oid="0ig50l8"
        />
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 z-50" data-oid="d-s2__p">
          <CardHeader
            className="flex flex-row items-center justify-between space-y-0 pb-2"
            data-oid="it2mhks"
          >
            <CardTitle className="text-sm font-medium" data-oid="hlm6yxy">
              Notifications
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
              data-oid="sbm59bs"
            >
              <X className="h-4 w-4" data-oid="n9lv8oa" />
            </Button>
          </CardHeader>
          <CardContent data-oid="m_0aiwx">
            <ScrollArea className="h-[400px] pr-4" data-oid="vc9.9-w">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="mb-4 last:mb-0 border shadow-sm"
                  data-oid="o.duf8f"
                >
                  <CardContent className="p-4" data-oid="83fn8jw">
                    <div
                      className="flex items-start space-x-4"
                      data-oid="u.nhrpk"
                    >
                      <div
                        className={`${notification.color} p-2 rounded-full bg-opacity-10`}
                        data-oid="g.kw2qv"
                      >
                        <notification.icon
                          className={`h-5 w-5 ${notification.color}`}
                          data-oid="4lfazb_"
                        />
                      </div>
                      <div className="flex-1 space-y-1" data-oid="9.ca2:8">
                        <p
                          className="text-sm font-medium leading-none"
                          data-oid="l2mo104"
                        >
                          {notification.title}
                        </p>
                        <p
                          className="text-sm text-muted-foreground"
                          data-oid="bkgbp2s"
                        >
                          {notification.message}
                        </p>
                        <p
                          className="text-xs text-muted-foreground"
                          data-oid="u3dh9as"
                        >
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
