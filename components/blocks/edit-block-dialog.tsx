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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="351ndig">
      <DialogContent className="sm:max-w-[425px]" data-oid="1k:tadv">
        <DialogHeader data-oid="g6:abx2">
          <DialogTitle data-oid="yqq6fvs">Blok Düzenle</DialogTitle>
          <DialogDescription data-oid="x41_dbi">
            Blok bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet
            butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="x5lrftl">
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="yiftd8l"
          >
            <Label htmlFor="name" className="text-right" data-oid="8djnnm7">
              Blok Adı
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              data-oid="0vf3.:8"
            />
          </div>
          <div
            className="grid grid-cols-4 items-center gap-4"
            data-oid="5qg6pec"
          >
            <Label
              htmlFor="apartmentCount"
              className="text-right"
              data-oid="wjjwv99"
            >
              Daire Sayısı
            </Label>
            <Input
              id="apartmentCount"
              type="number"
              value={apartmentCount}
              onChange={(e) => setApartmentCount(e.target.value)}
              className="col-span-3"
              data-oid="y.4r._n"
            />
          </div>
        </div>
        <DialogFooter data-oid="26p8hb.">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="ln.ys-e"
          >
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading} data-oid="o:7eg8i">
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
