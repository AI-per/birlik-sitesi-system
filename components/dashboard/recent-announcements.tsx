"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  authorRole: string;
  isUrgent: boolean;
}

interface RecentAnnouncementsProps {
  data: Announcement[];
}

export function RecentAnnouncements({ data }: RecentAnnouncementsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'MANAGER':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Yönetici';
      case 'MANAGER':
        return 'Site Yöneticisi';
      case 'RESIDENT':
        return 'Konut Sakini';
      case 'LANDLORD':
        return 'Ev Sahibi';
      default:
        return role;
    }
  };

  const truncateContent = (content: string, maxLength: number = 80) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">
          Henüz duyuru bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((announcement) => (
        <div key={announcement.id} className="flex items-start space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={announcement.author} />
            <AvatarFallback>{getInitials(announcement.author)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium leading-none">
                  {announcement.title}
                </p>
                {announcement.isUrgent && (
                  <Badge variant="destructive" className="text-xs">
                    Acil
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(announcement.createdAt)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {truncateContent(announcement.content)}
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                {announcement.author}
              </p>
              <Badge 
                variant={getRoleBadgeColor(announcement.authorRole)}
                className="text-xs"
              >
                {getRoleDisplayName(announcement.authorRole)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
