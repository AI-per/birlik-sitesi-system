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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded: () => void;
}

interface Apartment {
  id: string;
  number: string;
  floor: number;
  blockName: string;
}

export function AddUserDialog({
  open,
  onOpenChange,
  onUserAdded,
}: AddUserDialogProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [apartmentId, setApartmentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoadingApartments, setIsLoadingApartments] = useState(false);
  const [openApartmentSelector, setOpenApartmentSelector] = useState(false);

  // Daireleri yükle
  useEffect(() => {
    if (open) {
      fetchApartments();
    }
  }, [open]);

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

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Dialog kapatılırken formu temizle
      setFullName("");
      setEmail("");
      setPhone("");
      setRole("");
      setApartmentId("");
      setPassword("");
    }
    onOpenChange(newOpen);
  };

  const handleSave = async () => {
    if (!fullName.trim() || !phone.trim() || !role) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || null,
          phone: phone.trim(),
          role,
          apartmentId: apartmentId || null,
          password: password.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Kullanıcı başarıyla oluşturuldu");
        onUserAdded();
        handleOpenChange(false);
      } else {
        toast.error(data.error || "Kullanıcı oluşturulurken hata oluştu");
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error("Kullanıcı oluşturulurken hata oluştu");
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
          <DialogDescription>
            Yeni bir kullanıcı oluşturun. Gerekli bilgileri doldurun.
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
            <Popover open={openApartmentSelector} onOpenChange={setOpenApartmentSelector}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openApartmentSelector}
                  className="col-span-3 justify-between"
              disabled={isLoadingApartments}
            >
                  {apartmentId
                    ? apartments.find((apartment) => apartment.id === apartmentId)
                        ? `${apartments.find((apartment) => apartment.id === apartmentId)?.blockName} - Daire ${apartments.find((apartment) => apartment.id === apartmentId)?.number}`
                        : "Daire seçin..."
                    : "Daire seçin (opsiyonel)"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Daire ara..." />
                  <CommandEmpty>Daire bulunamadı.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="none"
                      onSelect={() => {
                        setApartmentId("");
                        setOpenApartmentSelector(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !apartmentId ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Daire seçilmedi
                    </CommandItem>
                {apartments.map((apartment) => (
                      <CommandItem
                        key={apartment.id}
                        value={`${apartment.blockName}-${apartment.number}-${apartment.floor}`}
                        onSelect={() => {
                          setApartmentId(apartment.id);
                          setOpenApartmentSelector(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            apartmentId === apartment.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                    {apartment.blockName} - Daire {apartment.number} ({apartment.floor}. Kat)
                      </CommandItem>
                ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
              placeholder="Boş bırakılırsa otomatik oluşturulur"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div></div>
            <div className="col-span-3 text-sm text-muted-foreground">
              * Gerekli alanlar<br/>
              Şifre belirtilmezse, e-posta adresinin @ öncesi kısmı + "123" olarak otomatik oluşturulur.
            </div>
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
            disabled={isLoading || !fullName.trim() || !phone.trim() || !role}
          >
            {isLoading ? "Oluşturuluyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 