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
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
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

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'MANAGER':
        return 'default';
      case 'LANDLORD':
        return 'outline';
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

  // Handle dialog events
  const handleAnnouncementAdded = () => {
    fetchAnnouncements();
    setAddingAnnouncement(false);
  };

  const handleAnnouncementUpdated = () => {
    fetchAnnouncements();
    setEditingAnnouncement(null);
  };

  const handleAnnouncementDeleted = () => {
    fetchAnnouncements();
    setDeletingAnnouncement(null);
  };

  // Define table columns
  const columns: DataTableColumn<Announcement>[] = [
    {
      id: "title",
      header: "Başlık",
      accessorKey: "title",
      sortable: true,
      sortType: "text",
      className: "max-w-[200px]",
      cell: (value, row) => (
        <Link 
          href={`/dashboard/announcements/${row.id}`}
          className="font-medium hover:underline"
        >
          {value}
        </Link>
      ),
    },
    {
      id: "content",
      header: "İçerik",
      accessorKey: "content",
      sortable: true,
      sortType: "text",
      className: "max-w-[300px]",
      cell: (value) => (
        <div className="text-sm text-muted-foreground">
          {truncateContent(value)}
        </div>
      ),
    },
    {
      id: "author",
      header: "Yazar",
      accessorFn: (row) => row.author.fullName,
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">{value}</span>
          <Badge variant={getRoleBadgeVariant(row.author.role) as any} className="text-xs w-fit mt-1">
            {getRoleLabel(row.author.role)}
          </Badge>
        </div>
      ),
    },
    {
      id: "status",
      header: "Durum",
      accessorKey: "isPublished",
      sortable: true,
      sortType: "text",
      searchable: false,
      cell: (value) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Yayında" : "Taslak"}
        </Badge>
      ),
    },
    {
      id: "createdAt",
      header: "Oluşturulma",
      accessorKey: "createdAt",
      sortable: true,
      sortType: "date",
      searchable: false,
      cell: (value) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(value)}
        </div>
      ),
    },
  ];

  // Render actions for each row
  const renderActions = (announcement: Announcement) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
          <span className="sr-only">Menüyü aç</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/announcements/${announcement.id}`} onClick={(e) => e.stopPropagation()}>
            <Icons.eye className="mr-2 h-4 w-4" />
            Detay
          </Link>
        </DropdownMenuItem>
        {(announcement.author.id === currentUserId || currentUserRole === 'ADMIN') && (
          <>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditingAnnouncement(announcement); }}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Düzenle
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); setDeletingAnnouncement(announcement); }}
              className="text-destructive focus:text-destructive"
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Sil
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Top actions (filters and add button)
  const topActions = (
    <>
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
        {canCreateAnnouncement && (
          <Button onClick={() => setAddingAnnouncement(true)}>
            <Icons.plus className="mr-2 h-4 w-4" />
            Yeni Duyuru
          </Button>
        )}
    </>
  );

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
                    </div>
      </div>

      <DataTable<Announcement>
        data={filteredAnnouncements}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Duyuru ara (başlık, içerik, yazar)..."
        emptyMessage="Henüz duyuru eklenmemiş."
        actions={renderActions}
        topActions={topActions}
      />

      {/* Dialogs */}
      {addingAnnouncement && (
        <AddAnnouncementDialog
          open={addingAnnouncement}
          onOpenChange={setAddingAnnouncement}
          onAnnouncementAdded={handleAnnouncementAdded}
          currentUserId={currentUserId}
        />
      )}

      {editingAnnouncement && (
        <EditAnnouncementDialog
          announcement={editingAnnouncement}
          open={!!editingAnnouncement}
          onOpenChange={() => setEditingAnnouncement(null)}
          onAnnouncementUpdated={handleAnnouncementUpdated}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
        />
      )}

      {deletingAnnouncement && (
        <DeleteAnnouncementDialog
          announcement={deletingAnnouncement}
          open={!!deletingAnnouncement}
          onOpenChange={() => setDeletingAnnouncement(null)}
          onAnnouncementDeleted={handleAnnouncementDeleted}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
        />
      )}
    </div>
  );
} 