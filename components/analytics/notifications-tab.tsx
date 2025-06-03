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
    <div className="space-y-4" data-oid="noxxt6j">
      <Card data-oid="-6u6gx6">
        <CardHeader data-oid="po7r19r">
          <CardTitle className="text-xl font-semibold" data-oid="9t8q710">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="96z9kud">
          {notificationTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center justify-between"
              data-oid="_d8:w25"
            >
              <div className="flex items-center space-x-4" data-oid="c0k:.vz">
                <type.icon
                  className="h-5 w-5 text-muted-foreground"
                  data-oid="na_kedg"
                />

                <span className="text-sm font-medium" data-oid="2luygn6">
                  {type.label}
                </span>
              </div>
              <Switch
                checked={notifications[type.id]}
                onCheckedChange={() => toggleNotification(type.id)}
                data-oid="q3_71p3"
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card data-oid="1io4:pz">
        <CardHeader data-oid="i8jvz2-">
          <CardTitle className="text-xl font-semibold" data-oid="-7tgaw4">
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-oid="10r2cvl">
          <div className="flex items-center space-x-4" data-oid="kxuvlc_">
            <AlertTriangle
              className="h-5 w-5 text-yellow-500"
              data-oid="u0ts.rh"
            />

            <div data-oid="e9tg959">
              <p className="text-sm font-medium" data-oid="9oarby5">
                Unusual account activity detected
              </p>
              <p className="text-xs text-muted-foreground" data-oid="vej0we5">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="pcwv0hp">
            <TrendingUp className="h-5 w-5 text-green-500" data-oid="lo_.dtc" />
            <div data-oid="byle8u-">
              <p className="text-sm font-medium" data-oid="8-m9s6y">
                Your portfolio has grown by 5% this week
              </p>
              <p className="text-xs text-muted-foreground" data-oid="q7x-c-8">
                1 day ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="p0h4.x6">
            <Bell className="h-5 w-5 text-blue-500" data-oid="c9d_unh" />
            <div data-oid="v181l9-">
              <p className="text-sm font-medium" data-oid="4ks_672">
                New feature: Advanced analytics now available
              </p>
              <p className="text-xs text-muted-foreground" data-oid="emo6y9e">
                3 days ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4" data-oid="r0vr1yq">
            <DollarSign
              className="h-5 w-5 text-purple-500"
              data-oid="_z0sz8n"
            />

            <div data-oid=":hbffxl">
              <p className="text-sm font-medium" data-oid="o62-tk-">
                Monthly financial report is ready for review
              </p>
              <p className="text-xs text-muted-foreground" data-oid="sjgg8pv">
                5 days ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end" data-oid="1wq48.2">
        <Button variant="outline" className="text-sm" data-oid=".giwh6s">
          View All Notifications
        </Button>
      </div>
    </div>
  );
}
