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

interface Block {
  id: string;
  name: string;
}

interface Apartment {
  id: string;
  number: string;
  floor: number;
  type: string | null;
  squareMeters: number | null;
  blockId: string;
  blockName: string;
}

interface EditApartmentDialogProps {
  apartment: Apartment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApartmentUpdated: () => void;
}

export function EditApartmentDialog({
  apartment,
  open,
  onOpenChange,
  onApartmentUpdated,
}: EditApartmentDialogProps) {
  const [number, setNumber] = useState(apartment.number);
  const [floor, setFloor] = useState(apartment.floor.toString());
  const [type, setType] = useState(apartment.type || "");
  const [squareMeters, setSquareMeters] = useState(apartment.squareMeters?.toString() || "");
  const [blockId, setBlockId] = useState(apartment.blockId);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false);

  // Apartment değiştiğinde form'u güncelle
  useEffect(() => {
    setNumber(apartment.number);
    setFloor(apartment.floor.toString());
    setType(apartment.type || "");
    setSquareMeters(apartment.squareMeters?.toString() || "");
    setBlockId(apartment.blockId);
  }, [apartment]);

  // Blokları yükle
  const fetchBlocks = async () => {
    try {
      setIsLoadingBlocks(true);
      const response = await fetch("/api/blocks");
      if (!response.ok) {
        throw new Error("Bloklar yüklenirken hata oluştu");
      }
      const data = await response.json();
      setBlocks(data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      toast.error("Bloklar yüklenirken hata oluştu");
    } finally {
      setIsLoadingBlocks(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchBlocks();
    }
  }, [open]);

  const handleSave = async () => {
    if (!number.trim()) {
      toast.error("Daire numarası gereklidir");
      return;
    }

    if (!floor.trim()) {
      toast.error("Kat numarası gereklidir");
      return;
    }

    if (!blockId) {
      toast.error("Blok seçimi gereklidir");
      return;
    }

    const floorNum = parseInt(floor);
    if (isNaN(floorNum) || floorNum < 0) {
      toast.error("Kat numarası geçerli bir sayı olmalıdır");
      return;
    }

    // Değişiklik var mı kontrol et
    const hasChanges = 
      number.trim() !== apartment.number ||
      floorNum !== apartment.floor ||
      (type.trim() || null) !== apartment.type ||
      (squareMeters.trim() ? parseInt(squareMeters.trim()) : null) !== apartment.squareMeters ||
      blockId !== apartment.blockId;

    if (!hasChanges) {
      toast.info("Herhangi bir değişiklik yapılmadı");
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/apartments/${apartment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number.trim(),
          floor: floorNum,
          type: type.trim() || null,
          squareMeters: squareMeters.trim() ? parseInt(squareMeters.trim()) : null,
          blockId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Daire güncellenirken hata oluştu");
      }

      toast.success("Daire başarıyla güncellendi");
      onOpenChange(false);
      onApartmentUpdated();
    } catch (error) {
      console.error("Error updating apartment:", error);
      toast.error(error instanceof Error ? error.message : "Daire güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Daire Düzenle</DialogTitle>
          <DialogDescription>
            Daire bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="block" className="text-right">
              Blok *
            </Label>
            <Select value={blockId} onValueChange={setBlockId} disabled={isLoadingBlocks}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={isLoadingBlocks ? "Yükleniyor..." : "Blok seçin"} />
              </SelectTrigger>
              <SelectContent>
                {blocks.map((block) => (
                  <SelectItem key={block.id} value={block.id}>
                    {block.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Daire No *
            </Label>
            <Input
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="col-span-3"
              placeholder="Örn: 1, 2A, 101"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="floor" className="text-right">
              Kat *
            </Label>
            <Input
              id="floor"
              type="number"
              min="0"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="col-span-3"
              placeholder="Örn: 0, 1, 2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Daire Tipi
            </Label>
            <Select value={type || "none"} onValueChange={(value) => setType(value === "none" ? "" : value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Daire tipi seçin (opsiyonel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Seçim kaldır</SelectItem>
                <SelectItem value="1+0">1+0</SelectItem>
                <SelectItem value="1+1">1+1</SelectItem>
                <SelectItem value="2+1">2+1</SelectItem>
                <SelectItem value="3+1">3+1</SelectItem>
                <SelectItem value="4+1">4+1</SelectItem>
                <SelectItem value="5+1">5+1</SelectItem>
                <SelectItem value="Dubleks">Dubleks</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="squareMeters" className="text-right">
              Metrekare
            </Label>
            <Input
              id="squareMeters"
              type="number"
              min="1"
              value={squareMeters}
              onChange={(e) => setSquareMeters(e.target.value)}
              className="col-span-3"
              placeholder="Örn: 85, 120"
            />
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
            disabled={isLoading || !number.trim() || !floor.trim() || !blockId}
          >
            {isLoading ? "Güncelleniyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 