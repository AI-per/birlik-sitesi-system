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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Blok Düzenle</DialogTitle>
          <DialogDescription>
            Blok bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet
            butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Blok Adı
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apartmentCount" className="text-right">
              Daire Sayısı
            </Label>
            <Input
              id="apartmentCount"
              type="number"
              value={apartmentCount}
              onChange={(e) => setApartmentCount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
