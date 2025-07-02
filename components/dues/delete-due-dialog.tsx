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

interface Due {
  id: string;
  apartmentId: string;
  amount: number;
  month: number;
  year: number;
  dueDate: string;
  isPaid: boolean;
  paidDate: string | null;
  paidAmount: number | null;
  apartment: {
    id: string;
    number: string;
    floor: number;
    block: {
      id: string;
      name: string;
    };
    resident: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
    };
  };
}

interface DeleteDueDialogProps {
  due: Due;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDueDeleted: () => void;
}

export function DeleteDueDialog({
  due,
  open,
  onOpenChange,
  onDueDeleted,
}: DeleteDueDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dues/${due.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Aidat başarıyla silindi");
        onDueDeleted();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Aidat silinirken hata oluştu");
      }
    } catch (error) {
      console.error('Error deleting due:', error);
      toast.error("Aidat silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aidat Sil</DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz. Aidat kaydı kalıcı olarak silinecektir.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Daire:</span>
              <span className="text-sm">{due.apartment.block.name} - {due.apartment.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Sakin:</span>
              <span className="text-sm">{due.apartment.resident.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Dönem:</span>
              <span className="text-sm">{getMonthName(due.month)} {due.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tutar:</span>
              <span className="text-sm font-medium">{formatCurrency(due.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Durum:</span>
              <span className={`text-sm font-medium ${due.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                {due.isPaid ? 'Ödendi' : 'Ödenmedi'}
              </span>
            </div>
          </div>
          
          {due.isPaid && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 border border-red-200">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-red-800">
                  Uyarı: Bu aidat ödenmiştir
                </span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                Ödenmiş aidatları silmek önerilmez. Bu işlem muhasebe kayıtlarını etkileyebilir.
              </p>
            </div>
          )}
        </div>
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