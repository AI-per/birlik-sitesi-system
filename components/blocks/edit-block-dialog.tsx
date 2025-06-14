"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";

interface EditBlockDialogProps {
  block: {
    id: string;
    name: string;
    apartmentCount: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBlockUpdated: () => void;
}

export function EditBlockDialog({
  block,
  open,
  onOpenChange,
  onBlockUpdated,
}: EditBlockDialogProps) {
  const [name, setName] = useState(block.name);
  const [isLoading, setIsLoading] = useState(false);

  // Block değiştiğinde form'u güncelle
  useEffect(() => {
    setName(block.name);
  }, [block]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Blok adı gereklidir");
      return;
    }

    if (name.trim() === block.name) {
      toast.info("Herhangi bir değişiklik yapılmadı");
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/blocks/${block.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Blok güncellenirken hata oluştu");
      }

      toast.success("Blok başarıyla güncellendi");
      onOpenChange(false);
      onBlockUpdated();
    } catch (error) {
      console.error("Error updating block:", error);
      toast.error(error instanceof Error ? error.message : "Blok güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Daire Sayısı
            </Label>
            <div className="col-span-3 text-sm text-muted-foreground">
              {block.apartmentCount} daire (otomatik hesaplanır)
            </div>
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
