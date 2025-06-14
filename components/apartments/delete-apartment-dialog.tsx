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

interface Apartment {
  id: string;
  number: string;
  blockName: string;
  residentCount?: number;
}

interface DeleteApartmentDialogProps {
  apartment: Apartment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApartmentDeleted: () => void;
}

export function DeleteApartmentDialog({
  apartment,
  open,
  onOpenChange,
  onApartmentDeleted,
}: DeleteApartmentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/apartments/${apartment.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Daire silinirken hata oluştu");
      }

      toast.success("Daire başarıyla silindi");
      onOpenChange(false);
      onApartmentDeleted();
    } catch (error) {
      console.error("Error deleting apartment:", error);
      toast.error(error instanceof Error ? error.message : "Daire silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Daire Sil</DialogTitle>
          <DialogDescription>
            <strong>{apartment.blockName} - Daire {apartment.number}</strong> dairesini silmek
            istediğinizden emin misiniz? Bu işlem geri alınamaz.
            {apartment.residentCount && apartment.residentCount > 0 && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                <strong>Uyarı:</strong> Bu dairede {apartment.residentCount} sakin bulunmaktadır.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 