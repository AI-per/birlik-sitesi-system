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
    <Dialog data-oid="7qstd-0">
      <DialogTrigger asChild data-oid="-.duplg">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid=".i98m.u"
        >
          {title === "Add Funds" && (
            <PlusCircle className="mr-2 h-4 w-4" data-oid="ktwohbl" />
          )}
          {title === "Send Money" && (
            <SendHorizontal className="mr-2 h-4 w-4" data-oid="onyec4a" />
          )}
          {title === "Top Up" && (
            <CreditCard className="mr-2 h-4 w-4" data-oid="6seebep" />
          )}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid="ql3aq5g">
        <DialogHeader data-oid="91q9ri2">
          <DialogTitle data-oid="e.e.aff">{title}</DialogTitle>
          <DialogDescription data-oid="rr1r3al">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="ny.w1qm">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="fn7fedg"
          >
            <Label htmlFor="amount" className="text-right" data-oid="30dnnru">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="-yi9u3c"
            />
          </div>
        </div>
        <Button type="submit" data-oid="y6w.783">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function QuickActions() {
  return (
    <Card className="border border-border" data-oid="__w_52g">
      <CardHeader data-oid="ehcm9f.">
        <CardTitle className="text-lg font-medium" data-oid="89kdcbe">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4" data-oid="j9juj6d">
        <ActionDialog
          title="Add Funds"
          description="Add funds to your account"
          actionText="Add Funds"
          data-oid="d9s74b4"
        />

        <ActionDialog
          title="Send Money"
          description="Send money to another account"
          actionText="Send Money"
          data-oid="gts6w:g"
        />

        <ActionDialog
          title="Top Up"
          description="Top up your account"
          actionText="Top Up"
          data-oid="hntz1am"
        />
      </CardContent>
    </Card>
  );
}
