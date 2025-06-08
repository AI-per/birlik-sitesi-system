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
    <div className="space-y-4" data-oid="_uhxiyx">
      <Card data-oid="-mzprgn">
        <CardHeader data-oid="2a62e.i">
          <CardTitle className="text-xl font-semibold" data-oid="3brda-e">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="gucywwd">
          {notificationTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between"
              data-oid="8s96tq0"
            >
              <div className="flex items-center space-x-4" data-oid="-e::hvy">
                <type.icon
                  className="h-5 w-5 text-muted-foreground"
                  data-oid="0co9cae"
                />

                <span className="text-sm font-medium" data-oid="2ik6ciz">
                  {type.label}
                </span>
              </div>
              <Switch
                checked={notifications[type.id]}
                onCheckedChange={() => toggleNotification(type.id)}
                data-oid="4dda.tx"
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card data-oid=":8u1xvi">
        <CardHeader data-oid="wl7j8el">
          <CardTitle className="text-xl font-semibold" data-oid="ta0ihz.">
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="1mwhucu">
          <div className="flex items-center space-x-4" data-oid="l_fiumt">
            <AlertTriangle
              className="h-5 w-5 text-yellow-500"
              data-oid="6e.--wv"
            />

            <div data-oid="862af:8">
              <p className="text-sm font-medium" data-oid="aaydfrg">
                Unusual account activity detected
              </p>
              <p className="text-xs text-muted-foreground" data-oid=":d2xlzi">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="5zqr65.">
            <TrendingUp className="h-5 w-5 text-green-500" data-oid="cc0ab8d" />
            <div data-oid="nt8dr3n">
              <p className="text-sm font-medium" data-oid="rou9qk:">
                Your portfolio has grown by 5% this week
              </p>
              <p className="text-xs text-muted-foreground" data-oid="mwbnghn">
                1 day ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="zv96nll">
            <Bell className="h-5 w-5 text-blue-500" data-oid="vbh5_nx" />
            <div data-oid="13l-z6c">
              <p className="text-sm font-medium" data-oid="a1r4_no">
                New feature: Advanced analytics now available
              </p>
              <p className="text-xs text-muted-foreground" data-oid="za4-gzv">
                3 days ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="7j62zwj">
            <DollarSign
              className="h-5 w-5 text-purple-500"
              data-oid="ct0zt60"
            />

            <div data-oid="uygdvt1">
              <p className="text-sm font-medium" data-oid="frl2b4q">
                Monthly financial report is ready for review
              </p>
              <p className="text-xs text-muted-foreground" data-oid="-g00b2w">
                5 days ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end" data-oid="a61ro7w">
        <Button variant="outline" className="text-sm" data-oid="n_sysj7">
          View All Notifications
        </Button>
      </div>
    </div>
  );
}
