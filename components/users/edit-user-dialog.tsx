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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface EditUserDialogProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    role: string;
    isActive: boolean;
    apartment: {
      id: string;
      number: string;
      floor: number;
      blockName: string;
    } | null;
    unpaidDuesCount?: number;
    totalUnpaidAmount?: number;
    createdAt?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}

interface Apartment {
  id: string;
  number: string;
  floor: number;
  blockName: string;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onUserUpdated,
}: EditUserDialogProps) {
  // Eğer user null ise dialog'u açma
  if (!user) {
    return null;
  }
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [apartmentId, setApartmentId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoadingApartments, setIsLoadingApartments] = useState(false);

  // Form verilerini kullanıcı bilgileriyle doldur
  useEffect(() => {
    if (user && open) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole(user.role || "");
      setApartmentId(user.apartment?.id || "");
      setIsActive(user.isActive ?? true);
      setPassword("");
      fetchApartments();
    }
  }, [user, open]);

  const fetchApartments = async () => {
    setIsLoadingApartments(true);
    try {
      const response = await fetch('/api/apartments');
      if (response.ok) {
        const data = await response.json();
        setApartments(data);
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
    } finally {
      setIsLoadingApartments(false);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim() || !phone.trim() || !role) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }

    if (!user?.id) {
      toast.error("Kullanıcı bilgisi bulunamadı");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || null,
          phone: phone.trim(),
          role,
          apartmentId: apartmentId || null,
          isActive,
          password: password.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Kullanıcı başarıyla güncellendi");
        onUserUpdated();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Kullanıcı güncellenirken hata oluştu");
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("Kullanıcı güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleLabel = (roleValue: string) => {
    switch (roleValue) {
      case 'RESIDENT':
        return 'Sakin';
      case 'LANDLORD':
        return 'Daire Sahibi';
      case 'MANAGER':
        return 'Yönetici';
      case 'ADMIN':
        return 'Admin';
      default:
        return roleValue;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Kullanıcı Düzenle</DialogTitle>
          <DialogDescription>
            Kullanıcı bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Ad Soyad *
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="col-span-3"
              placeholder="Örn: Ahmet Yılmaz"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="Örn: ahmet@example.com (opsiyonel)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefon *
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
              placeholder="Örn: 0532 123 45 67"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rol *
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Rol seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RESIDENT">Sakin</SelectItem>
                <SelectItem value="LANDLORD">Daire Sahibi</SelectItem>
                <SelectItem value="MANAGER">Yönetici</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apartment" className="text-right">
              Daire
            </Label>
            <Select 
              value={apartmentId || "none"} 
              onValueChange={(value) => setApartmentId(value === "none" ? "" : value)}
              disabled={isLoadingApartments}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={isLoadingApartments ? "Yükleniyor..." : "Daire seçin (opsiyonel)"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Daire seçilmedi</SelectItem>
                {apartments.map((apartment) => (
                  <SelectItem key={apartment.id} value={apartment.id}>
                    {apartment.blockName} - Daire {apartment.number} ({apartment.floor}. Kat)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isActive" className="text-right">
              Aktif
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive" className="text-sm">
                {isActive ? "Aktif" : "Pasif"}
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Yeni Şifre
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
              placeholder="Değiştirmek için yeni şifre girin"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div></div>
            <div className="col-span-3 text-sm text-muted-foreground">
              * Gerekli alanlar<br/>
              Şifre alanı boş bırakılırsa mevcut şifre korunur.
            </div>
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
            disabled={isLoading || !fullName.trim() || !phone.trim() || !role}
          >
            {isLoading ? "Güncelleniyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 