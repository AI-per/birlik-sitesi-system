import { Button } from "@/components/ui/button";
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
import type React from "react"; // Import React

interface FunctionModalProps {
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
}

export function FunctionModal({
  title,
  description,
  actionText,
  icon,
}: FunctionModalProps) {
  return (
    <Dialog data-oid="frjbc4i">
      <DialogTrigger asChild data-oid="hqkawqr">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid="gqt656d"
        >
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid="xjxfuj.">
        <DialogHeader data-oid="a.q6jhs">
          <DialogTitle data-oid=":_0rozu">{title}</DialogTitle>
          <DialogDescription data-oid="8u6wif7">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="uq2zz8o">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="yma9a0p"
          >
            <Label htmlFor="amount" className="text-right" data-oid="9n9uxv2">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="7y3.n2-"
            />
          </div>
        </div>
        <Button type="submit" data-oid="0quhz:x">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
