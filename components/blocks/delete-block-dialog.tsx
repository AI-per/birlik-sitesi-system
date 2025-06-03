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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="5o.bgg2">
      <DialogContent className="sm:max-w-[425px]" data-oid="9r44tm1">
        <DialogHeader data-oid="62y7_a3">
          <DialogTitle data-oid="prjry2a">Blok Sil</DialogTitle>
          <DialogDescription data-oid="56tw7mc">
            <strong data-oid="9muf4-2">{block.name}</strong> bloğunu silmek
            istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter data-oid="evchsj8">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="xfet:xp"
          >
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            data-oid="-3lrp4a"
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
