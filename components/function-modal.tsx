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
    <Dialog data-oid="5azugzc">
      <DialogTrigger asChild data-oid="-s.odnb">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid="-ap:a0f"
        >
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid="4pzn1ou">
        <DialogHeader data-oid="ahub911">
          <DialogTitle data-oid="gy6qcxf">{title}</DialogTitle>
          <DialogDescription data-oid="8tu1qk1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="gif0diw">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="iwkm_xd"
          >
            <Label htmlFor="amount" className="text-right" data-oid="kwme14s">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="ob.stxz"
            />
          </div>
        </div>
        <Button type="submit" data-oid="-cxp7zd">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
