"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Attachment {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  attachments?: Attachment[];
  author: {
    id: string;
    fullName: string;
    role: string;
  };
}

export default function EditAnnouncementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    // Fetch current user data
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/profile");
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [session, status, router]);

  useEffect(() => {
    if (currentUser) {
      fetchAnnouncement();
    }
  }, [params.id, currentUser]);

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch(`/api/announcements/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        throw new Error('Failed to fetch announcement');
      }
      const data = await response.json();
      setAnnouncement(data);
      
      // Form verilerini doldur
      setTitle(data.title);
      setContent(data.content);
      setIsPublished(data.isPublished);
      setExistingAttachments(data.attachments || []);
    } catch (error) {
      console.error('Error fetching announcement:', error);
      toast.error('Duyuru yüklenirken hata oluştu');
      router.push('/dashboard/announcements');
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!announcement || !currentUser) return;

    // Validation
    if (!title.trim()) {
      toast.error('Başlık gereklidir');
      return;
    }

    if (!content.trim()) {
      toast.error('İçerik gereklidir');
      return;
    }

    if (title.length > 200) {
      toast.error('Başlık 200 karakterden uzun olamaz');
      return;
    }

    if (content.length > 5000) {
      toast.error('İçerik 5000 karakterden uzun olamaz');
      return;
    }

    setSaving(true);
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
          currentUserId: currentUser.id,
          currentUserRole: currentUser.role,
          attachments: uploadedFiles,
          existingAttachments: existingAttachments,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Güncelleme başarısız');
      }

      toast.success('Duyuru başarıyla güncellendi');
      router.push(`/dashboard/announcements/${announcement.id}`);
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error(error instanceof Error ? error.message : 'Duyuru güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading || !currentUser) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Duyuru Bulunamadı</h2>
            <p className="text-muted-foreground mt-2">Düzenlemek istediğiniz duyuru mevcut değil.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/announcements">
                Duyurulara Dön
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Yetki kontrolü
  const canEdit = announcement.author.id === currentUser.id || currentUser.role === 'ADMIN';
  
  if (!canEdit) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Yetki Hatası</h2>
            <p className="text-muted-foreground mt-2">Bu duyuruyu düzenleme yetkiniz bulunmamaktadır.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/announcements">
                Duyurulara Dön
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/announcements/${announcement.id}`}>
              <Icons.arrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Duyuru Düzenle</h1>
            <p className="text-muted-foreground">
              Duyuru bilgilerini güncelleyin
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Duyuru Bilgileri</CardTitle>
            <CardDescription>
              Duyuru başlığı, içeriği ve yayın durumunu düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Başlık <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Duyuru başlığını girin..."
                maxLength={200}
                required
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/200 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">
                İçerik <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Duyuru içeriğini girin..."
                rows={10}
                maxLength={5000}
                required
              />
              <p className="text-xs text-muted-foreground">
                {content.length}/5000 karakter
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="published">
                Duyuruyu yayınla
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dosya Ekleri</CardTitle>
            <CardDescription>
              Duyuruya fotoğraf, video veya dosya ekleyebilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attachments">Dosya Seç</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Desteklenen formatlar: Resim, Video, PDF, Word, Metin dosyaları
              </p>
            </div>

            {/* Mevcut Ekler */}
            {existingAttachments.length > 0 && (
              <div className="space-y-2">
                <Label>Mevcut Ekler</Label>
                <div className="space-y-2">
                  {existingAttachments.map((attachment, index) => (
                    <div key={attachment.id} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Icons.file className="h-4 w-4" />
                        <span className="text-sm">{attachment.originalName}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(attachment.fileSize / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(attachment.url, '_blank')}
                        >
                          <Icons.eye className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExistingAttachment(index)}
                        >
                          <Icons.trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Seçilen Dosyalar</Label>
                <div className="space-y-2">
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
                        <Icons.trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Güncelleniyor...
              </>
            ) : (
              <>
                <Icons.check className="mr-2 h-4 w-4" />
                Güncelle
              </>
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/dashboard/announcements/${announcement.id}`}>
              İptal
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
} 