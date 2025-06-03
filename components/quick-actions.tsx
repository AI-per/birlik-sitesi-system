"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, SendHorizontal, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ActionDialog({
  title,
  description,
  actionText,
}: {
  title: string;
  description: string;
  actionText: string;
}) {
  return (
    <Dialog data-oid="4::o3fc">
      <DialogTrigger asChild data-oid="etsi9n-">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid="hkfo:uf"
        >
          {title === "Add Funds" && (
            <PlusCircle className="mr-2 h-4 w-4" data-oid="4jxauxd" />
          )}
          {title === "Send Money" && (
            <SendHorizontal className="mr-2 h-4 w-4" data-oid="9lunvk3" />
          )}
          {title === "Top Up" && (
            <CreditCard className="mr-2 h-4 w-4" data-oid="u-o5b4w" />
          )}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid=".m3s4kf">
        <DialogHeader data-oid="bhmpa0p">
          <DialogTitle data-oid="9d48dy:">{title}</DialogTitle>
          <DialogDescription data-oid="9mh3i2u">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="k1txu-:">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="19cmsjj"
          >
            <Label htmlFor="amount" className="text-right" data-oid="09d8emu">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="4siqkmx"
            />
          </div>
        </div>
        <Button type="submit" data-oid="tpl:27s">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function QuickActions() {
  return (
    <Card className="border border-border" data-oid="oledh2d">
      <CardHeader data-oid="r40o_30">
        <CardTitle className="text-lg font-medium" data-oid="zmo26q8">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4" data-oid="tyf-.l5">
        <ActionDialog
          title="Add Funds"
          description="Add funds to your account"
          actionText="Add Funds"
          data-oid="yz3pl1v"
        />

        <ActionDialog
          title="Send Money"
          description="Send money to another account"
          actionText="Send Money"
          data-oid="6xl-1w9"
        />

        <ActionDialog
          title="Top Up"
          description="Top up your account"
          actionText="Top Up"
          data-oid="3a6denf"
        />
      </CardContent>
    </Card>
  );
}
