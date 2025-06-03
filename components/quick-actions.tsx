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
    <Dialog data-oid="vn.01z3">
      <DialogTrigger asChild data-oid=".yxhqyy">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid="w-l-xwb"
        >
          {title === "Add Funds" && (
            <PlusCircle className="mr-2 h-4 w-4" data-oid="qj6t7m6" />
          )}
          {title === "Send Money" && (
            <SendHorizontal className="mr-2 h-4 w-4" data-oid="3u3i.-u" />
          )}
          {title === "Top Up" && (
            <CreditCard className="mr-2 h-4 w-4" data-oid="o5h0fx0" />
          )}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid="5nj3.lw">
        <DialogHeader data-oid="dej3sff">
          <DialogTitle data-oid="zya1vxh">{title}</DialogTitle>
          <DialogDescription data-oid="cj82:d:">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="47retro">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="n15q.b1"
          >
            <Label htmlFor="amount" className="text-right" data-oid="92t2.5u">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="r.zceg9"
            />
          </div>
        </div>
        <Button type="submit" data-oid=".gd:hi:">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function QuickActions() {
  return (
    <Card className="border border-border" data-oid="m9n-nd-">
      <CardHeader data-oid="0-fu31v">
        <CardTitle className="text-lg font-medium" data-oid="r:16llm">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4" data-oid="bv4knw3">
        <ActionDialog
          title="Add Funds"
          description="Add funds to your account"
          actionText="Add Funds"
          data-oid=":nz749j"
        />

        <ActionDialog
          title="Send Money"
          description="Send money to another account"
          actionText="Send Money"
          data-oid="2ta_hr7"
        />

        <ActionDialog
          title="Top Up"
          description="Top up your account"
          actionText="Top Up"
          data-oid="6bf3fus"
        />
      </CardContent>
    </Card>
  );
}
