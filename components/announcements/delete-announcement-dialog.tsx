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
import { Icons } from "@/components/icons";

interface DeleteAnnouncementDialogProps {
  announcement: {
    id: string;
    title: string;
    author: {
      id: string;
      fullName: string;
      role: string;
    };
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnnouncementDeleted: () => void;
  currentUserId: string;
  currentUserRole: string;
}

export function DeleteAnnouncementDialog({
  announcement,
  open,
  onOpenChange,
  onAnnouncementDeleted,
  currentUserId,
  currentUserRole,
}: DeleteAnnouncementDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/announcements/${announcement.id}?deleterId=${currentUserId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Duyuru başarıyla silindi");
        onAnnouncementDeleted();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Duyuru silinirken hata oluştu");
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error("Duyuru silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  // Yetki kontrolü
  const canDelete = announcement.author.id === currentUserId || currentUserRole === 'ADMIN';

  if (!canDelete) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Yetki Hatası</DialogTitle>
            <DialogDescription>
              Bu duyuruyu silme yetkiniz bulunmamaktadır.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.trash className="h-5 w-5 text-red-500" />
            Duyuru Sil
          </DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz. Duyuru kalıcı olarak silinecektir.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-lg border p-4 bg-muted/50">
            <h4 className="font-medium text-sm mb-2">Silinecek Duyuru:</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Başlık:</strong> {announcement.title}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Yazar:</strong> {announcement.author.fullName}
            </p>
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
            variant="destructive"
            onClick={handleDelete} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Siliniyor...
              </>
            ) : (
              <>
                <Icons.trash className="mr-2 h-4 w-4" />
                Sil
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 