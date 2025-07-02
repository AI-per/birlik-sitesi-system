"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { AddUserDialog } from "./add-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import Link from "next/link";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  detail_url?: string;
  apartment: {
    id: string;
    number: string;
    floor: number;
    blockName: string;
  } | null;
  unpaidDuesCount: number;
  totalUnpaidAmount: number;
}

export function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtreleme
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.apartment && (
        user.apartment.blockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.apartment.number.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "active" && user.isActive) ||
      (selectedStatus === "inactive" && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'RESIDENT':
        return 'Sakin';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  // Handle row click for navigation
  const handleRowClick = (user: User, event: React.MouseEvent) => {
    // Don't navigate if detail_url is not available or empty
    if (!user.detail_url || user.detail_url.trim() === '') {
      return;
    }

    // Don't navigate if clicking on links or dropdown menu trigger
    const target = event.target as HTMLElement;
    if (target.closest('a') || target.closest('[role="button"]') || target.closest('button')) {
      return;
    }

    // Navigate to detail page
    router.push(user.detail_url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Kullanıcı ara (ad, e-posta, telefon, daire)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tüm Roller" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Roller</SelectItem>
              <SelectItem value="RESIDENT">Sakin</SelectItem>
              <SelectItem value="LANDLORD">Daire Sahibi</SelectItem>
              <SelectItem value="MANAGER">Yönetici</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tüm Durumlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Pasif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setAddingUser(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Yeni Kullanıcı
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Soyad</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Daire</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Ödenmemiş Aidat</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {users.length === 0 ? "Henüz kullanıcı eklenmemiş." : "Sonuç bulunamadı."}
                </TableCell>
              </TableRow>
            ) :
              filteredUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  className={
                    user.detail_url && user.detail_url.trim() !== ''
                      ? "cursor-pointer hover:bg-muted/50 transition-colors"
                      : "cursor-default"
                  }
                  onClick={(event) => handleRowClick(user, event)}
                >
                  <TableCell className="font-medium">
                    <Link 
                      href={`/dashboard/users/${user.id}`}
                      className="hover:underline"
                    >
                      {user.fullName}
                    </Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.phone ? (
                      user.phone
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.apartment ? (
                      <Link 
                        href={`/dashboard/apartments/${user.apartment.id}`}
                        className="hover:underline text-sm"
                      >
                        {user.apartment.blockName} - Daire {user.apartment.number}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.unpaidDuesCount > 0 ? (
                      <div className="text-sm">
                        <div className="font-medium text-red-600">
                          {user.unpaidDuesCount} adet
                        </div>
                        <div className="text-muted-foreground">
                          {formatCurrency(user.totalUnpaidAmount)}
                        </div>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-green-600">
                        Temiz
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <span className="sr-only">Menüyü aç</span>
                          <Icons.moreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/users/${user.id}`}>
                            <Icons.eye className="mr-2 h-4 w-4" />
                            Detay
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(event) => {
                          event.stopPropagation();
                          setEditingUser(user);
                        }}>
                          <Icons.edit className="mr-2 h-4 w-4" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeletingUser(user);
                          }}
                          className="text-red-600"
                          disabled={user.role === 'ADMIN'}
                        >
                          <Icons.trash className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <AddUserDialog
        open={addingUser}
        onOpenChange={setAddingUser}
        onUserAdded={fetchUsers}
      />

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onUserUpdated={fetchUsers}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          onUserDeleted={fetchUsers}
        />
      )}
    </div>
  );
} 