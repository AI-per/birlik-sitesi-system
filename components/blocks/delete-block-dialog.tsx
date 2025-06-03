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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="f:u5gk3">
      <DialogContent className="sm:max-w-[425px]" data-oid="tmoliou">
        <DialogHeader data-oid="tvcba.t">
          <DialogTitle data-oid="piu1qdw">Blok Sil</DialogTitle>
          <DialogDescription data-oid="4wjb:w6">
            <strong data-oid=":enc5:9">{block.name}</strong> bloğunu silmek
            istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter data-oid="5afikxi">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="4x-uyzu"
          >
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            data-oid="v76vkua"
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
