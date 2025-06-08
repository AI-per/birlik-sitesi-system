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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="aq38uwx">
      <DialogContent className="sm:max-w-[425px]" data-oid="fahldup">
        <DialogHeader data-oid="vfpetj7">
          <DialogTitle data-oid="t9g0e30">Blok Düzenle</DialogTitle>
          <DialogDescription data-oid="pk97p2-">
            Blok bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet
            butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="85ai0xc">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="-s-75qz"
          >
            <Label htmlFor="name" className="text-right" data-oid="a.q.f7z">
              Blok Adı
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              data-oid="_1rz3cu"
            />
          </div>
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="aennswp"
          >
            <Label
              htmlFor="apartmentCount"
              className="text-right"
              data-oid="-zyxs17"
            >
              Daire Sayısı
            </Label>
            <Input
              id="apartmentCount"
              type="number"
              value={apartmentCount}
              onChange={(e) => setApartmentCount(e.target.value)}
              className="col-span-3"
              data-oid="9b1s0s8"
            />
          </div>
        </div>
        <DialogFooter data-oid="y:obzv:">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="94m:owr"
          >
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading} data-oid="d1ue5ha">
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
