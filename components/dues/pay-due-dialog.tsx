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

interface PayDueDialogProps {
  due: Due;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentRecorded: () => void;
}

export function PayDueDialog({
  due,
  open,
  onOpenChange,
  onPaymentRecorded,
}: PayDueDialogProps) {
  const [paidAmount, setPaidAmount] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form verilerini doldur
  useEffect(() => {
    if (open && due) {
      setPaidAmount(due.amount.toString());
      setPaidDate(new Date().toISOString().split('T')[0]);
    }
  }, [open, due]);

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

  const handleSave = async () => {
    if (!paidAmount || !paidDate) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    if (parseFloat(paidAmount) <= 0) {
      toast.error("Ödenen tutar pozitif olmalıdır");
      return;
    }

    const selectedDate = new Date(paidDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      toast.error("Ödeme tarihi bugünden ileri olamaz");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/dues/${due.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPaid: true,
          paidAmount: parseFloat(paidAmount),
          paidDate: new Date(paidDate).toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Ödeme başarıyla kaydedildi");
        onPaymentRecorded();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Ödeme kaydedilirken hata oluştu");
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error("Ödeme kaydedilirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const paidAmountNum = parseFloat(paidAmount) || 0;
  const difference = paidAmountNum - due.amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ödeme Kaydet</DialogTitle>
          <DialogDescription>
            {due?.apartment.block.name} - {due?.apartment.number} ({due?.apartment.resident.fullName}) aidat ödemesini kaydedin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Aidat Bilgileri */}
          <div className="rounded-lg border p-4 space-y-2">
            <h4 className="text-sm font-medium">Aidat Bilgileri</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dönem:</span>
                <span>{getMonthName(due.month)} {due.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tutar:</span>
                <span className="font-medium">{formatCurrency(due.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Son Ödeme:</span>
                <span>{new Date(due.dueDate).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durum:</span>
                <span className="text-red-600 font-medium">Ödenmedi</span>
              </div>
            </div>
          </div>

          {/* Ödeme Bilgileri */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="paidAmount">
                Ödenen Tutar (₺) *
              </Label>
              <Input
                id="paidAmount"
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                placeholder="1500"
                min="0"
                step="0.01"
              />
              {difference !== 0 && paidAmount && (
                <div className={`text-xs ${difference > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {difference > 0 
                    ? `${formatCurrency(difference)} fazla ödeme` 
                    : `${formatCurrency(Math.abs(difference))} eksik ödeme`
                  }
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paidDate">
                Ödeme Tarihi *
              </Label>
              <Input
                id="paidDate"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Uyarı */}
          <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-blue-800">
                Bilgi
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Bu işlem aidat kaydını "Ödendi" olarak işaretleyecektir. İşlem sonrası değişiklik yapmak için aidat düzenleme özelliğini kullanabilirsiniz.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            * Gerekli alanlar
          </div>
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
            onClick={handleSave} 
            disabled={isLoading || !paidAmount || !paidDate}
          >
            {isLoading ? "Kaydediliyor..." : "Ödemeyi Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 