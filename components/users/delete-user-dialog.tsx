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

interface DeleteUserDialogProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    unpaidDuesCount?: number;
    totalUnpaidAmount?: number;
    apartment?: {
      number: string;
      blockName: string;
    } | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserDeleted: () => void;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onUserDeleted,
}: DeleteUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Kullanıcı başarıyla silindi");
        onUserDeleted();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Kullanıcı silinirken hata oluştu");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Kullanıcı silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'RESIDENT':
        return 'Konut Sakini';
      case 'LANDLORD':
        return 'Daire Sahibi';
      case 'MANAGER':
        return 'Yönetici';
      case 'ADMIN':
        return 'Admin';
      default:
        return role;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kullanıcı Sil</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <p>
                <strong>{user.fullName}</strong> ({user.email}) kullanıcısını silmek
                istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Rol:</span>
                  <span>{getRoleLabel(user.role)}</span>
                  
                  {user.apartment && (
                    <>
                      <span className="font-medium">Daire:</span>
                      <span>{user.apartment.blockName} - Daire {user.apartment.number}</span>
                    </>
                  )}
                </div>
              </div>

              {user.role === 'ADMIN' && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <strong>Uyarı:</strong> Bu bir admin kullanıcısıdır ve silinemez.
                </div>
              )}

              {user.unpaidDuesCount && user.unpaidDuesCount > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                  <strong>Uyarı:</strong> Bu kullanıcının {user.unpaidDuesCount} adet ödenmemiş aidatı bulunmaktadır 
                  ({formatCurrency(user.totalUnpaidAmount || 0)}).
                </div>
              )}
            </div>
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
            disabled={isLoading || user.role === 'ADMIN'}
          >
            {isLoading ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 