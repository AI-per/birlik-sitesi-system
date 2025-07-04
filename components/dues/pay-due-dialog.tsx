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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [notes, setNotes] = useState("");

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
      // Create payment using the new payment API
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dueId: due.id,
          amount: parseFloat(paidAmount),
          paymentDate: new Date(paidDate).toISOString(),
          paymentMethod: paymentMethod || null,
          receiptNumber: receiptNumber || null,
          notes: notes || null,
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paid-amount" className="text-right">
                Ödenen Tutar
              </Label>
              <Input
                id="paid-amount"
                type="number"
                step="0.01"
                min="0"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paid-date" className="text-right">
                Ödeme Tarihi
              </Label>
              <Input
                id="paid-date"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment-method" className="text-right">
                Ödeme Yöntemi
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Ödeme yöntemi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nakit">Nakit</SelectItem>
                  <SelectItem value="Banka Havalesi">Banka Havalesi</SelectItem>
                  <SelectItem value="EFT">EFT</SelectItem>
                  <SelectItem value="Kredi Kartı">Kredi Kartı</SelectItem>
                  <SelectItem value="Çek">Çek</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="receipt-number" className="text-right">
                Fiş/Dekont No
              </Label>
              <Input
                id="receipt-number"
                type="text"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                className="col-span-3"
                placeholder="Opsiyonel"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notlar
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
                placeholder="Ek notlar (opsiyonel)"
                rows={3}
              />
            </div>

            {paidAmountNum > 0 && (
              <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                <div className="col-span-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aidat Tutarı:</span>
                    <span className="font-medium">{formatCurrency(due.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ödenen Tutar:</span>
                    <span className="font-medium">{formatCurrency(paidAmountNum)}</span>
                  </div>
                  <div className={`flex justify-between text-sm font-medium ${
                    difference > 0 ? 'text-blue-600' : difference < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    <span>Fark:</span>
                    <span>
                      {difference > 0 ? '+' : ''}{formatCurrency(Math.abs(difference))}
                      {difference > 0 && ' (Fazla ödeme)'}
                      {difference < 0 && ' (Eksik ödeme)'}
                      {difference === 0 && ' (Tam ödeme)'}
                    </span>
                  </div>
                </div>
              </div>
            )}
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