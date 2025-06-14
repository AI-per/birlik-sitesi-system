"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { AddAnnouncementDialog } from "./add-announcement-dialog";
import { EditAnnouncementDialog } from "./edit-announcement-dialog";
import { DeleteAnnouncementDialog } from "./delete-announcement-dialog";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: any[];
  author: {
    id: string;
    fullName: string;
    role: string;
  };
}

interface AnnouncementListProps {
  currentUserId: string;
  currentUserRole: string;
}

export function AnnouncementList({ currentUserId, currentUserRole }: AnnouncementListProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [addingAnnouncement, setAddingAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/announcements');
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtreleme
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "published" && announcement.isPublished) ||
      (selectedStatus === "draft" && !announcement.isPublished);
    
    const matchesAuthor = selectedAuthor === "all" || announcement.author.id === selectedAuthor;
    
    return matchesSearch && matchesStatus && matchesAuthor;
  });

  // Benzersiz yazarları al
  const uniqueAuthors = Array.from(
    new Map(announcements.map(a => [a.author.id, a.author])).values()
  );

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'RESIDENT':
        return 'Sakin';
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
        return 'destructive';
      case 'MANAGER':
        return 'default';
      case 'RESIDENT':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Yetki kontrolü
  const canCreateAnnouncement = currentUserRole === 'MANAGER' || currentUserRole === 'ADMIN';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Duyuru ara (başlık, içerik, yazar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tüm Durumlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="published">Yayında</SelectItem>
              <SelectItem value="draft">Taslak</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tüm Yazarlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Yazarlar</SelectItem>
              {uniqueAuthors.map((author) => (
                <SelectItem key={author.id} value={author.id}>
                  {author.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {canCreateAnnouncement && (
          <Button onClick={() => setAddingAnnouncement(true)}>
            <Icons.plus className="mr-2 h-4 w-4" />
            Yeni Duyuru
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>İçerik</TableHead>
              <TableHead>Yazar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : filteredAnnouncements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {announcements.length === 0 ? "Henüz duyuru eklenmemiş." : "Sonuç bulunamadı."}
                </TableCell>
              </TableRow>
            ) :
              filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium max-w-[200px]">
                    <Link 
                      href={`/dashboard/announcements/${announcement.id}`}
                      className="hover:underline"
                    >
                      {announcement.title}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="text-sm text-muted-foreground">
                      {truncateContent(announcement.content)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {announcement.author.fullName}
                      </span>
                      <Badge variant={getRoleBadgeVariant(announcement.author.role)} className="w-fit text-xs">
                        {getRoleLabel(announcement.author.role)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                      {announcement.isPublished ? "Yayında" : "Taslak"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(announcement.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menüyü aç</span>
                          <Icons.moreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/announcements/${announcement.id}`}>
                            <Icons.eye className="mr-2 h-4 w-4" />
                            Detay
                          </Link>
                        </DropdownMenuItem>
                        {(announcement.author.id === currentUserId || currentUserRole === 'ADMIN') && (
                          <>
                            <DropdownMenuItem onClick={() => setEditingAnnouncement(announcement)}>
                              <Icons.edit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setDeletingAnnouncement(announcement)}
                              className="text-red-600"
                            >
                              <Icons.trash className="mr-2 h-4 w-4" />
                              Sil
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {canCreateAnnouncement && (
        <AddAnnouncementDialog
          open={addingAnnouncement}
          onOpenChange={setAddingAnnouncement}
          onAnnouncementAdded={fetchAnnouncements}
          currentUserId={currentUserId}
        />
      )}

      {editingAnnouncement && (
        <EditAnnouncementDialog
          announcement={editingAnnouncement}
          open={!!editingAnnouncement}
          onOpenChange={(open) => !open && setEditingAnnouncement(null)}
          onAnnouncementUpdated={fetchAnnouncements}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
        />
      )}

      {deletingAnnouncement && (
        <DeleteAnnouncementDialog
          announcement={deletingAnnouncement}
          open={!!deletingAnnouncement}
          onOpenChange={(open) => !open && setDeletingAnnouncement(null)}
          onAnnouncementDeleted={fetchAnnouncements}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
        />
      )}
    </div>
  );
} 