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
    <Dialog data-oid="fuuim:i">
      <DialogTrigger asChild data-oid="7s_dm9o">
        <Button
          variant="outline"
          className="w-full justify-start"
          data-oid="vn-.oxv"
        >
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-oid="oj5etbq">
        <DialogHeader data-oid="ff50y8l">
          <DialogTitle data-oid=".cicevu">{title}</DialogTitle>
          <DialogDescription data-oid="dhsrtuf">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="hbfp8xz">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="nb19-jw"
          >
            <Label htmlFor="amount" className="text-right" data-oid="hkc:7hl">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
              data-oid="o.bimhv"
            />
          </div>
        </div>
        <Button type="submit" data-oid="9u4ds5e">
          {actionText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
