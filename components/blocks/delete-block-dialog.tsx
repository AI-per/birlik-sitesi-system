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
import { toast } from "sonner";

interface DeleteBlockDialogProps {
  block: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBlockDeleted: () => void;
}

export function DeleteBlockDialog({
  block,
  open,
  onOpenChange,
  onBlockDeleted,
}: DeleteBlockDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blocks/${block.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Blok silinirken hata oluştu");
      }

      toast.success("Blok başarıyla silindi");
      onOpenChange(false);
      onBlockDeleted();
    } catch (error) {
      console.error("Error deleting block:", error);
      toast.error(error instanceof Error ? error.message : "Blok silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="qf9np4f">
      <DialogContent className="sm:max-w-[425px]" data-oid="xwfc0ms">
        <DialogHeader data-oid="-q98qt6">
          <DialogTitle data-oid="x95vfkv">Blok Sil</DialogTitle>
          <DialogDescription data-oid="j651t:b">
            <strong data-oid=".rd1ymj">{block.name}</strong> bloğunu silmek
            istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter data-oid="mqeiojh">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid=".o-.l6j"
          >
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            data-oid="xh5xj.s"
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
