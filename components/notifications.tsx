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
    <div className="relative" data-oid="pabi9jd">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        data-oid="6mnuus7"
      >
        <Bell className="h-5 w-5" data-oid="9nzfe9g" />
        <span
          className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
          data-oid="bxmiehl"
        />
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 z-50" data-oid="-rz.9aa">
          <CardHeader
            className="flex flex-row items-center justify-between space-y-0 pb-2"
            data-oid="owzidxl"
          >
            <CardTitle className="text-sm font-medium" data-oid="hb7v7u:">
              Notifications
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
              data-oid="bhlptps"
            >
              <X className="h-4 w-4" data-oid="lah4627" />
            </Button>
          </CardHeader>
          <CardContent data-oid=".k7qhrx">
            <ScrollArea className="h-[400px] pr-4" data-oid="xct11t.">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="mb-4 last:mb-0 border shadow-sm"
                  data-oid="hw4t7t7"
                >
                  <CardContent className="p-4" data-oid="rbz.x6p">
                    <div
                      className="flex items-start space-x-4"
                      data-oid="xad9qi0"
                    >
                      <div
                        className={`${notification.color} p-2 rounded-full bg-opacity-10`}
                        data-oid="52agdqf"
                      >
                        <notification.icon
                          className={`h-5 w-5 ${notification.color}`}
                          data-oid="pd-5u_5"
                        />
                      </div>
                      <div className="flex-1 space-y-1" data-oid="m3ldgcm">
                        <p
                          className="text-sm font-medium leading-none"
                          data-oid="p9cy_ni"
                        >
                          {notification.title}
                        </p>
                        <p
                          className="text-sm text-muted-foreground"
                          data-oid="u.5gk:6"
                        >
                          {notification.message}
                        </p>
                        <p
                          className="text-xs text-muted-foreground"
                          data-oid=":i33qig"
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
