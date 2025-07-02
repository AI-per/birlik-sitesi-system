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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface EditDueDialogProps {
  due: Due;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDueUpdated: () => void;
}

export function EditDueDialog({
  due,
  open,
  onOpenChange,
  onDueUpdated,
}: EditDueDialogProps) {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form verilerini doldur
  useEffect(() => {
    if (open && due) {
      setAmount(due.amount.toString());
      setMonth(due.month.toString());
      setYear(due.year.toString());
      setDueDate(new Date(due.dueDate).toISOString().split('T')[0]);
    }
  }, [open, due]);

  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  const handleSave = async () => {
    if (!amount || !month || !year || !dueDate) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast.error("Tutar pozitif olmalıdır");
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
          amount: parseFloat(amount),
          month: parseInt(month),
          year: parseInt(year),
          dueDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Aidat başarıyla güncellendi");
        onDueUpdated();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Aidat güncellenirken hata oluştu");
      }
    } catch (error) {
      console.error('Error updating due:', error);
      toast.error("Aidat güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Aidat Düzenle</DialogTitle>
          <DialogDescription>
            {due?.apartment.block.name} - {due?.apartment.number} ({due?.apartment.resident.fullName}) aidat bilgilerini düzenleyin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">
                Ay *
              </Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Ay seçin" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={m.toString()}>
                      {getMonthName(m)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">
                Yıl *
              </Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                min="2020"
                max="2030"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">
              Tutar (₺) *
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1500"
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">
              Son Ödeme Tarihi *
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          {due?.isPaid && (
            <div className="rounded-lg bg-green-50 p-3 border border-green-200">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-800">
                  Bu aidat ödenmiştir
                </span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Ödeme Tarihi: {due.paidDate ? new Date(due.paidDate).toLocaleDateString('tr-TR') : '-'}
              </p>
              <p className="text-xs text-green-600">
                Ödenen Tutar: {due.paidAmount ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(due.paidAmount) : '-'}
              </p>
            </div>
          )}
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
            disabled={isLoading || !amount || !month || !year || !dueDate}
          >
            {isLoading ? "Güncelleniyor..." : "Güncelle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 