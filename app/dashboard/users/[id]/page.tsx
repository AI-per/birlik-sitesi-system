"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import { EditUserDialog } from "@/components/users/edit-user-dialog";
import { DeleteUserDialog } from "@/components/users/delete-user-dialog";
import { toast } from "sonner";
import Link from "next/link";

interface Due {
  id: string;
  amount: number;
  dueDate: string;
  month: number;
  year: number;
  description: string | null;
  isPaid: boolean;
  paymentDate: string | null;
}

interface UserDetail {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  apartment: {
    id: string;
    number: string;
    floor: number;
    type: string | null;
    squareMeters: number | null;
    blockName: string;
  } | null;
  dues: Due[];
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 404) {
        toast.error("Kullanıcı bulunamadı");
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error("Kullanıcı yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserUpdated = () => {
    fetchUser();
  };

  const handleUserDeleted = () => {
    router.push("/dashboard/users");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h3 className="text-lg font-semibold">Kullanıcı bulunamadı</h3>
        <p className="text-muted-foreground">Bu kullanıcı mevcut değil veya silinmiş olabilir.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/users">Kullanıcılara Dön</Link>
        </Button>
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const unpaidDues = user.dues.filter(due => !due.isPaid);
  const totalUnpaidAmount = unpaidDues.reduce((sum, due) => sum + due.amount, 0);
  const paidDues = user.dues.filter(due => due.isPaid);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/users">
            <Button variant="ghost" size="sm">
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {user.fullName}
          </h2>
          <Badge variant={getRoleBadgeVariant(user.role)}>
            {getRoleLabel(user.role)}
          </Badge>
          <Badge variant={user.isActive ? "default" : "secondary"}>
            {user.isActive ? "Aktif" : "Pasif"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setEditingUser(true)}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeletingUser(true)}
            disabled={user.role === 'ADMIN'}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Sil
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ödenmemiş Aidat</CardTitle>
            <Icons.billing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unpaidDues.length}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(totalUnpaidAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Aidat</CardTitle>
            <Icons.fileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.dues.length}</div>
            <p className="text-xs text-muted-foreground">
              Tüm dönemler
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ödenen Aidat</CardTitle>
            <Icons.check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidDues.length}</div>
            <p className="text-xs text-muted-foreground">
              Başarılı ödemeler
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kayıt Tarihi</CardTitle>
            <Icons.calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(user.createdAt)}</div>
            <p className="text-xs text-muted-foreground">
              Sisteme eklenme
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Temel kullanıcı özellikleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Ad Soyad</p>
                <p className="text-sm text-muted-foreground">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">E-posta</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">
                  {user.phone || "Belirtilmemiş"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Rol</p>
                <p className="text-sm text-muted-foreground">
                  {getRoleLabel(user.role)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Durum</p>
                <p className="text-sm text-muted-foreground">
                  {user.isActive ? "Aktif" : "Pasif"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Kayıt Tarihi</p>
                <p className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daire Bilgileri</CardTitle>
            <CardDescription>
              Kullanıcının yaşadığı daire
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.apartment ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Blok</p>
                    <p className="text-sm text-muted-foreground">{user.apartment.blockName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Daire No</p>
                    <p className="text-sm text-muted-foreground">{user.apartment.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kat</p>
                    <p className="text-sm text-muted-foreground">{user.apartment.floor}. Kat</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tip</p>
                    <p className="text-sm text-muted-foreground">
                      {user.apartment.type || "Belirtilmemiş"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Metrekare</p>
                    <p className="text-sm text-muted-foreground">
                      {user.apartment.squareMeters ? `${user.apartment.squareMeters} m²` : "Belirtilmemiş"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/apartments/${user.apartment.id}`}>
                      <Icons.home className="mr-2 h-4 w-4" />
                      Daire Detayına Git
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Bu kullanıcıya atanmış daire bulunmuyor.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aidat Geçmişi</CardTitle>
          <CardDescription>
            Kullanıcının tüm aidat kayıtları
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.dues.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Bu kullanıcıya ait aidat kaydı bulunmuyor.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dönem</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Son Ödeme Tarihi</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ödeme Tarihi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.dues.map((due) => (
                  <TableRow key={due.id}>
                    <TableCell className="font-medium">
                      {due.month}/{due.year}
                    </TableCell>
                    <TableCell>{formatCurrency(due.amount)}</TableCell>
                    <TableCell>{formatDate(due.dueDate)}</TableCell>
                    <TableCell>
                      {due.description || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={due.isPaid ? "default" : "destructive"}>
                        {due.isPaid ? "Ödendi" : "Ödenmedi"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {due.paymentDate ? (
                        formatDate(due.paymentDate)
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {editingUser && (
        <EditUserDialog
          user={{
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
            apartment: user.apartment ? {
              id: user.apartment.id,
              number: user.apartment.number,
              floor: user.apartment.floor,
              blockName: user.apartment.blockName,
            } : null,
          }}
          open={editingUser}
          onOpenChange={setEditingUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={{
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            unpaidDuesCount: unpaidDues.length,
            totalUnpaidAmount: totalUnpaidAmount,
            apartment: user.apartment ? {
              number: user.apartment.number,
              blockName: user.apartment.blockName,
            } : null,
          }}
          open={deletingUser}
          onOpenChange={setDeletingUser}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
} 