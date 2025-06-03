"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
} from "lucide-react";

const notificationTypes = [
  { id: "account", label: "Account Activity", icon: Bell },
  { id: "security", label: "Security Alerts", icon: AlertTriangle },
  { id: "performance", label: "Performance Updates", icon: TrendingUp },
  { id: "market", label: "Market Trends", icon: TrendingDown },
  { id: "financial", label: "Financial Reports", icon: DollarSign },
  { id: "user", label: "User Behavior", icon: Users },
];

export function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    account: true,
    security: true,
    performance: false,
    market: false,
    financial: true,
    user: false,
  });

  const toggleNotification = (id) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4" data-oid="u8ex08d">
      <Card data-oid="5m2ilww">
        <CardHeader data-oid="0rfn30e">
          <CardTitle className="text-xl font-semibold" data-oid="1bpd7dw">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="0ho6utb">
          {notificationTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between"
              data-oid="0p3yby7"
            >
              <div className="flex items-center space-x-4" data-oid="1rzw:kh">
                <type.icon
                  className="h-5 w-5 text-muted-foreground"
                  data-oid="zpivpso"
                />

                <span className="text-sm font-medium" data-oid="p-z98u7">
                  {type.label}
                </span>
              </div>
              <Switch
                checked={notifications[type.id]}
                onCheckedChange={() => toggleNotification(type.id)}
                data-oid="qtyhf3h"
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card data-oid="cbgrc_i">
        <CardHeader data-oid="8:ic0yh">
          <CardTitle className="text-xl font-semibold" data-oid="6tbtkla">
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="x1c54lx">
          <div className="flex items-center space-x-4" data-oid="60ic1l5">
            <AlertTriangle
              className="h-5 w-5 text-yellow-500"
              data-oid="59b--9a"
            />

            <div data-oid="9n-ojrd">
              <p className="text-sm font-medium" data-oid="c.gor48">
                Unusual account activity detected
              </p>
              <p className="text-xs text-muted-foreground" data-oid="mww:np-">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="9v3bqvk">
            <TrendingUp className="h-5 w-5 text-green-500" data-oid="kgq_276" />
            <div data-oid="0wu0yfu">
              <p className="text-sm font-medium" data-oid="72gjac6">
                Your portfolio has grown by 5% this week
              </p>
              <p className="text-xs text-muted-foreground" data-oid="n5ea4ku">
                1 day ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="uls5x6_">
            <Bell className="h-5 w-5 text-blue-500" data-oid="z3m367n" />
            <div data-oid="9you9b-">
              <p className="text-sm font-medium" data-oid="6-gq:_y">
                New feature: Advanced analytics now available
              </p>
              <p className="text-xs text-muted-foreground" data-oid="hii19ep">
                3 days ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="oof8b25">
            <DollarSign
              className="h-5 w-5 text-purple-500"
              data-oid="n95-dw6"
            />

            <div data-oid="etsrhs6">
              <p className="text-sm font-medium" data-oid="c.-fj..">
                Monthly financial report is ready for review
              </p>
              <p className="text-xs text-muted-foreground" data-oid="yx4bsjn">
                5 days ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end" data-oid="gc_8bqs">
        <Button variant="outline" className="text-sm" data-oid="hptoecn">
          View All Notifications
        </Button>
      </div>
    </div>
  );
}
