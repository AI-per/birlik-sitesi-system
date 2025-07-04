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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

interface AddAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnnouncementAdded: () => void;
  currentUserId: string;
}

export function AddAnnouncementDialog({
  open,
  onOpenChange,
  onAnnouncementAdded,
  currentUserId,
}: AddAnnouncementDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Dialog kapatılırken formu temizle
      setTitle("");
      setContent("");
      setIsPublished(true);
      setAttachments([]);
    }
    onOpenChange(newOpen);
  };

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

    setIsLoading(true);
    try {
      let uploadedFiles = [];
      
      // Dosya yükleme işlemi (varsa)
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
      
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          isPublished,
          authorId: currentUserId,
          attachments: uploadedFiles, // Yüklenen dosyalar
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Duyuru başarıyla oluşturuldu");
        onAnnouncementAdded();
        handleOpenChange(false);
      } else {
        toast.error(data.error || "Duyuru oluşturulurken hata oluştu");
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error("Duyuru oluşturulurken hata oluştu");
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Duyuru Oluştur</DialogTitle>
          <DialogDescription>
            Site sakinlerine yeni bir duyuru oluşturun. Gerekirse dosya ekleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Duyuru başlığı..."
              maxLength={200}
            />
            <div className="text-xs text-muted-foreground">
              {title.length}/200 karakter
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">İçerik</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Duyuru içeriği..."
              className="min-h-[100px]"
              maxLength={5000}
            />
            <div className="text-xs text-muted-foreground">
              {content.length}/5000 karakter
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="isPublished">Duyuruyu hemen yayınla</Label>
          </div>
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
            {attachments.length > 0 && (
              <div className="space-y-2 mt-2">
                <Label className="text-sm">Seçilen Dosyalar</Label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Icons.file className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        <Icons.trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            disabled={isLoading || !title.trim() || !content.trim()}
          >
            {isLoading ? "Oluşturuluyor..." : "Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 