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

interface AddApartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApartmentAdded: () => void;
}

export function AddApartmentDialog({
  open,
  onOpenChange,
  onApartmentAdded,
}: AddApartmentDialogProps) {
  const [number, setNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [type, setType] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [blockId, setBlockId] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false);

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

    setIsLoading(true);
    try {
      const response = await fetch("/api/apartments", {
        method: "POST",
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
        throw new Error(data.error || "Daire oluşturulurken hata oluştu");
      }

      toast.success("Daire başarıyla oluşturuldu");
      handleReset();
      onOpenChange(false);
      onApartmentAdded();
    } catch (error) {
      console.error("Error creating apartment:", error);
      toast.error(error instanceof Error ? error.message : "Daire oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setNumber("");
    setFloor("");
    setType("");
    setSquareMeters("");
    setBlockId("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleReset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni Daire Ekle</DialogTitle>
          <DialogDescription>
            Yeni bir daire oluşturun. Gerekli bilgileri girin ve kaydet butonuna tıklayın.
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
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Daire tipi seçin (opsiyonel)" />
              </SelectTrigger>
              <SelectContent>
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
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !number.trim() || !floor.trim() || !blockId}
          >
            {isLoading ? "Oluşturuluyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 