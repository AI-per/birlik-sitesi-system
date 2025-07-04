"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Mock user data
const MOCK_CURRENT_USER = {
  id: "d6468359-5825-4d7a-8f59-768e2382608e", // Real user ID from database (alper - ADMIN)
  role: "ADMIN"
};

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    fullName: string;
    role: string;
  };
}

export default function AnnouncementPage() {
  const router = useRouter();
  const params = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAnnouncement();
  }, [params.id]);

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
    } catch (error) {
      console.error('Error fetching announcement:', error);
      toast.error('Duyuru yüklenirken hata oluştu');
      router.push('/dashboard/announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!announcement) return;
    
    if (!confirm('Bu duyuruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/announcements/${announcement.id}?currentUserId=${MOCK_CURRENT_USER.id}&currentUserRole=${MOCK_CURRENT_USER.role}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Silme işlemi başarısız');
      }

      toast.success('Duyuru başarıyla silindi');
      router.push('/dashboard/announcements');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error(error instanceof Error ? error.message : 'Duyuru silinirken hata oluştu');
    } finally {
      setDeleting(false);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'RESIDENT':
        return 'Konut Sakini';
      case 'MANAGER':
        return 'Yönetici';
      case 'ADMIN':
        return 'Admin';
      default:
        return role;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive' as const;
      case 'MANAGER':
        return 'default' as const;
      case 'RESIDENT':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
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
            <p className="text-muted-foreground mt-2">Aradığınız duyuru mevcut değil.</p>
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

  const canEdit = announcement.author.id === MOCK_CURRENT_USER.id || MOCK_CURRENT_USER.role === 'ADMIN';

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/announcements">
              <Icons.arrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Duyuru Detayı</h1>
            <p className="text-muted-foreground">
              Duyuru bilgilerini görüntüleyin
            </p>
          </div>
        </div>
        {canEdit && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/announcements/${announcement.id}/edit`}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Düzenle
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              {deleting ? 'Siliniyor...' : 'Sil'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Ana Duyuru Kartı */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{announcement.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icons.user className="h-4 w-4" />
                    <span>{announcement.author.fullName}</span>
                    <Badge variant={getRoleBadgeVariant(announcement.author.role)} className="text-xs">
                      {getRoleLabel(announcement.author.role)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.calendar className="h-4 w-4" />
                    <span>{formatDate(announcement.createdAt)}</span>
                  </div>
                  <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                    {announcement.isPublished ? "Yayında" : "Taslak"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {announcement.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metadata Kartı */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Duyuru Bilgileri</CardTitle>
            <CardDescription>
              Duyuru ile ilgili teknik bilgiler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icons.user className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Yazar:</span>
                  <span>{announcement.author.fullName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icons.shield className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Rol:</span>
                  <Badge variant={getRoleBadgeVariant(announcement.author.role)} className="text-xs">
                    {getRoleLabel(announcement.author.role)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icons.eye className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Durum:</span>
                  <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                    {announcement.isPublished ? "Yayında" : "Taslak"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icons.calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Oluşturulma:</span>
                  <span>{formatDate(announcement.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icons.clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Son Güncelleme:</span>
                  <span>{formatDate(announcement.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icons.hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">ID:</span>
                  <span className="font-mono text-xs">{announcement.id}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 