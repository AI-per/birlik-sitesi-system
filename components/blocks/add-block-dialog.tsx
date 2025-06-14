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
import { toast } from "sonner";

interface AddBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBlockAdded: () => void;
}

export function AddBlockDialog({
  open,
  onOpenChange,
  onBlockAdded,
}: AddBlockDialogProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Blok adı gereklidir");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Blok oluşturulurken hata oluştu");
      }

      toast.success("Blok başarıyla oluşturuldu");
      setName("");
      onOpenChange(false);
      onBlockAdded();
    } catch (error) {
      console.error("Error creating block:", error);
      toast.error(error instanceof Error ? error.message : "Blok oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setName("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Blok Ekle</DialogTitle>
          <DialogDescription>
            Yeni bir blok oluşturun. Blok adını girin ve kaydet butonuna tıklayın.
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
              placeholder="Örn: A Blok"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !name.trim()}>
            {isLoading ? "Oluşturuluyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 