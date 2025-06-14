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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

interface Attachment {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
}

interface EditAnnouncementDialogProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    attachments?: Attachment[];
    author: {
      id: string;
      fullName: string;
      role: string;
    };
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnnouncementUpdated: () => void;
  currentUserId: string;
  currentUserRole: string;
}

export function EditAnnouncementDialog({
  announcement,
  open,
  onOpenChange,
  onAnnouncementUpdated,
  currentUserId,
  currentUserRole,
}: EditAnnouncementDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<Attachment[]>([]);

  // Form verilerini duyuru bilgileriyle doldur
  useEffect(() => {
    if (announcement && open) {
      setTitle(announcement.title || "");
      setContent(announcement.content || "");
      setIsPublished(announcement.isPublished ?? true);
      setExistingAttachments(announcement.attachments || []);
      setAttachments([]);
    }
  }, [announcement, open]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Lütfen başlık ve içerik alanlarını doldurun");
      return;
    }

    if (title.length > 200) {
      toast.error("Başlık 200 karakterden uzun olamaz");
      return;
    }

    if (content.length > 5000) {
      toast.error("İçerik 5000 karakterden uzun olamaz");
      return;
    }

    // Değişiklik var mı kontrol et
    const hasChanges = 
      title.trim() !== announcement.title ||
      content.trim() !== announcement.content ||
      isPublished !== announcement.isPublished;

    if (!hasChanges) {
      toast.info("Herhangi bir değişiklik yapılmadı");
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      let uploadedFiles = [];
      
      // Dosya yükleme işlemi
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach(file => {
          formData.append('files', file);
        });

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          throw new Error(uploadError.error || 'Dosya yükleme başarısız');
        }

        const uploadResult = await uploadResponse.json();
        uploadedFiles = uploadResult.files;
      }

      const response = await fetch(`/api/announcements/${announcement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          isPublished,
          currentUserId: currentUserId,
          currentUserRole: currentUserRole,
          attachments: uploadedFiles,
          existingAttachments: existingAttachments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Duyuru başarıyla güncellendi");
        onAnnouncementUpdated();
        onOpenChange(false);
      } else {
        toast.error(data.error || "Duyuru güncellenirken hata oluştu");
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error("Duyuru güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingAttachment = (index: number) => {
    setExistingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Yetki kontrolü
  const canEdit = announcement.author.id === currentUserId || currentUserRole === 'ADMIN';

  if (!canEdit) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Yetki Hatası</DialogTitle>
            <DialogDescription>
              Bu duyuruyu düzenleme yetkiniz bulunmamaktadır.
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Duyuru Düzenle</DialogTitle>
          <DialogDescription>
            Duyuru bilgilerini düzenleyin. Değişiklikleri kaydetmek için kaydet butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Başlık *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Duyuru başlığını girin"
              maxLength={200}
            />
            <div className="text-xs text-muted-foreground text-right">
              {title.length}/200 karakter
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">
              İçerik *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Duyuru içeriğini girin..."
              className="min-h-[200px] resize-none"
              maxLength={5000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {content.length}/5000 karakter
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="isPublished" className="text-sm">
              {isPublished ? "Yayında" : "Taslak"}
            </Label>
          </div>
          <div className="text-sm text-muted-foreground">
            * Gerekli alanlar
          </div>
          
          {/* Dosya Ekleri Bölümü */}
          <div className="grid gap-2">
            <Label htmlFor="attachments">Dosya Ekleri</Label>
            <Input
              id="attachments"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <div className="text-xs text-muted-foreground">
              Desteklenen formatlar: Resim, Video, PDF, Word, Metin dosyaları
            </div>
          </div>

          {/* Mevcut Ekler */}
          {existingAttachments.length > 0 && (
            <div className="grid gap-2">
              <Label>Mevcut Ekler</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {existingAttachments.map((attachment, index) => (
                  <div key={attachment.id} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Icons.file className="h-4 w-4" />
                      <span className="text-sm">{attachment.originalName}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(attachment.fileSize / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(attachment.url, '_blank')}
                      >
                        <Icons.eye className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExistingAttachment(index)}
                      >
                        <Icons.trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yeni Seçilen Dosyalar */}
          {attachments.length > 0 && (
            <div className="grid gap-2">
              <Label>Seçilen Dosyalar</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Icons.file className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <Icons.trash className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            disabled={isLoading || !title.trim() || !content.trim()}
          >
            {isLoading ? "Güncelleniyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 