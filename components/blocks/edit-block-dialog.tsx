"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditBlockDialogProps {
  block: {
    id: string;
    name: string;
    apartmentCount: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBlockDialog({
  block,
  open,
  onOpenChange,
}: EditBlockDialogProps) {
  const [name, setName] = useState(block.name);
  const [apartmentCount, setApartmentCount] = useState(
    block.apartmentCount.toString(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement save logic
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="ul-d7hw">
      <DialogContent className="sm:max-w-[425px]" data-oid="f0b2oj8">
        <DialogHeader data-oid="z9d3gmj">
          <DialogTitle data-oid="2jbx3kd">Blok Düzenle</DialogTitle>
          <DialogDescription data-oid="6ne2:c9">
            Blok bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet
            butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="og-6o2w">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="5u.o72g"
          >
            <Label htmlFor="name" className="text-right" data-oid="a2u7hqj">
              Blok Adı
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              data-oid="-5k6060"
            />
          </div>
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="yqmb5hj"
          >
            <Label
              htmlFor="apartmentCount"
              className="text-right"
              data-oid="mk.0-pq"
            >
              Daire Sayısı
            </Label>
            <Input
              id="apartmentCount"
              type="number"
              value={apartmentCount}
              onChange={(e) => setApartmentCount(e.target.value)}
              className="col-span-3"
              data-oid=".j0ofke"
            />
          </div>
        </div>
        <DialogFooter data-oid="epoc.0k">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="l-jj68s"
          >
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading} data-oid="t-eznai">
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
