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

interface DeleteBlockDialogProps {
  block: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteBlockDialog({
  block,
  open,
  onOpenChange,
}: DeleteBlockDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // TODO: Implement delete logic
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
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
