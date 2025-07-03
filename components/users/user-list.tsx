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
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
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

  // Filter data based on selected filters
  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "active" && user.isActive) ||
      (selectedStatus === "inactive" && !user.isActive);
    
    return matchesRole && matchesStatus;
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
    if (user.detail_url && user.detail_url.trim() !== '') {
      router.push(user.detail_url);
    }
  };

  // Check if row is clickable
  const isRowClickable = (user: User) => {
    return !!(user.detail_url && user.detail_url.trim() !== '');
  };

  // Handle dialog events
  const handleUserAdded = () => {
    fetchUsers();
    setAddingUser(false);
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleUserDeleted = () => {
    fetchUsers();
    setDeletingUser(null);
  };

  // Define table columns
  const columns: DataTableColumn<User>[] = [
    {
      id: "fullName",
      header: "Ad Soyad",
      accessorKey: "fullName",
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <Link 
          href={`/dashboard/users/${row.id}`}
          className="font-medium hover:underline"
        >
          {value}
        </Link>
      ),
    },
    {
      id: "email",
      header: "E-posta",
      accessorKey: "email",
      sortable: true,
      sortType: "text",
      cell: (value) => value || <span className="text-muted-foreground">-</span>,
    },
    {
      id: "phone",
      header: "Telefon",
      accessorKey: "phone",
      sortable: true,
      sortType: "text",
      cell: (value) => value || <span className="text-muted-foreground">-</span>,
    },
    {
      id: "role",
      header: "Rol",
      accessorKey: "role",
      sortable: true,
      sortType: "text",
      searchable: false, // Don't include role in text search, use filter instead
      cell: (value) => (
        <Badge variant={getRoleBadgeVariant(value) as any}>
          {getRoleLabel(value)}
        </Badge>
      ),
    },
    {
      id: "apartment",
      header: "Daire",
      accessorFn: (row) => row.apartment ? `${row.apartment.blockName} - Daire ${row.apartment.number}` : null,
      sortable: true,
      sortType: "text",
      cell: (value, row) => 
        row.apartment ? (
          <Link 
            href={`/dashboard/apartments/${row.apartment.id}`}
            className="hover:underline text-sm"
          >
            {row.apartment.blockName} - Daire {row.apartment.number}
          </Link>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      id: "status",
      header: "Durum",
      accessorKey: "isActive",
      sortable: true,
      sortType: "text",
      searchable: false,
      cell: (value) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Aktif" : "Pasif"}
        </Badge>
      ),
    },
    {
      id: "unpaidDues",
      header: "Ödenmemiş Aidat",
      accessorKey: "unpaidDuesCount",
      sortable: true,
      sortType: "number",
      searchable: false,
      cell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">{value} adet</span>
          {row.totalUnpaidAmount > 0 && (
            <span className="text-xs text-muted-foreground">
              {formatCurrency(row.totalUnpaidAmount)}
            </span>
          )}
        </div>
      ),
    },
  ];

  // Render actions for each row
  const renderActions = (user: User) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
          <span className="sr-only">Menüyü aç</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/users/${user.id}`} onClick={(e) => e.stopPropagation()}>
            <Icons.eye className="mr-2 h-4 w-4" />
            Detay
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditingUser(user); }}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Düzenle
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={(e) => { e.stopPropagation(); setDeletingUser(user); }}
          className="text-destructive focus:text-destructive"
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Sil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Top actions (filters and add button)
  const topActions = (
    <>
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
      <Button onClick={() => setAddingUser(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Yeni Kullanıcı
      </Button>
    </>
  );

     return (
     <div className="space-y-4">
       <DataTable<User>
        data={filteredUsers}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Kullanıcı ara (ad, e-posta, telefon, daire)..."
        emptyMessage="Henüz kullanıcı eklenmemiş."
        onRowClick={handleRowClick}
        rowClickCondition={isRowClickable}
        actions={renderActions}
        topActions={topActions}
      />

      {/* Dialogs */}
      {addingUser && (
        <AddUserDialog
          open={addingUser}
          onOpenChange={setAddingUser}
          onUserAdded={handleUserAdded}
        />
      )}

      {editingUser && (
        <EditUserDialog
          user={{
            id: editingUser.id,
            fullName: editingUser.fullName,
            email: editingUser.email,
            phone: editingUser.phone,
            role: editingUser.role,
            isActive: editingUser.isActive,
            apartment: editingUser.apartment ? {
              id: editingUser.apartment.id,
              number: editingUser.apartment.number,
              floor: editingUser.apartment.floor,
              blockName: editingUser.apartment.blockName,
            } : null,
          }}
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={() => setDeletingUser(null)}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
} 