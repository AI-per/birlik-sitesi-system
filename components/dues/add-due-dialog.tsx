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

interface AddDueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDueAdded: () => void;
}

export function AddDueDialog({
  open,
  onOpenChange,
  onDueAdded,
}: AddDueDialogProps) {
  const [apartmentId, setApartmentId] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apartments, setApartments] = useState<any[]>([]);

  // Form verilerini sıfırla
  useEffect(() => {
    if (open) {
      setApartmentId("");
      setAmount("");
      setMonth((new Date().getMonth() + 1).toString());
      setYear(new Date().getFullYear().toString());
      setDueDate("");
      fetchApartments();
    }
  }, [open]);

  const fetchApartments = async () => {
    try {
      const response = await fetch('/api/apartments');
      if (response.ok) {
        const data = await response.json();
        setApartments(data);
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  const handleSave = async () => {
    if (!apartmentId || !amount || !month || !year || !dueDate) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast.error("Tutar pozitif olmalıdır");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/dues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apartmentId,
          amount: parseFloat(amount),
          month: parseInt(month),
          year: parseInt(year),
          dueDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Aidat başarıyla oluşturuldu");
        onDueAdded();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Aidat oluşturulurken hata oluştu");
      }
    } catch (error) {
      console.error('Error creating due:', error);
      toast.error("Aidat oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni Aidat Oluştur</DialogTitle>
          <DialogDescription>
            Seçilen daire için yeni aidat kaydı oluşturun.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apartment">
              Daire *
            </Label>
            <Select value={apartmentId} onValueChange={setApartmentId}>
              <SelectTrigger>
                <SelectValue placeholder="Daire seçin" />
              </SelectTrigger>
              <SelectContent>
                {apartments.map((apartment) => (
                  <SelectItem key={apartment.id} value={apartment.id}>
                    {apartment.block?.name} - {apartment.number} ({apartment.resident?.fullName || 'Boş'})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
            disabled={isLoading || !apartmentId || !amount || !month || !year || !dueDate}
          >
            {isLoading ? "Oluşturuluyor..." : "Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 