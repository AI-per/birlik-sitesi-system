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
import { EditApartmentDialog } from "@/components/apartments/edit-apartment-dialog";
import { DeleteApartmentDialog } from "@/components/apartments/delete-apartment-dialog";
import { toast } from "sonner";

interface Resident {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

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

interface ApartmentDetail {
  id: string;
  number: string;
  floor: number;
  type: string | null;
  squareMeters: number | null;
  blockId: string;
  blockName: string;
  createdAt: string;
  residents: Resident[];
  dues: Due[];
}

export default function ApartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const apartmentId = params.id as string;

  const [apartment, setApartment] = useState<ApartmentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingApartment, setEditingApartment] = useState<ApartmentDetail | null>(null);
  const [deletingApartment, setDeletingApartment] = useState<ApartmentDetail | null>(null);

  const fetchApartment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/apartments/${apartmentId}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Daire bulunamadı");
          router.push("/dashboard/apartments");
          return;
        }
        throw new Error("Daire yüklenirken hata oluştu");
      }
      const data = await response.json();
      setApartment(data);
    } catch (error) {
      console.error("Error fetching apartment:", error);
      toast.error("Daire yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (apartmentId) {
      fetchApartment();
    }
  }, [apartmentId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getMonthName = (month: number) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[month - 1];
  };

  const handleApartmentUpdated = () => {
    fetchApartment();
  };

  const handleApartmentDeleted = () => {
    router.push("/dashboard/apartments");
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icons.spinner className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Daire bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg font-medium">Daire bulunamadı</p>
            <Button onClick={() => router.push("/dashboard/apartments")} className="mt-4">
              Dairelere Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const unpaidDues = apartment.dues.filter(due => !due.isPaid);
  const paidDues = apartment.dues.filter(due => due.isPaid);
  const totalUnpaidAmount = unpaidDues.reduce((sum, due) => sum + due.amount, 0);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/apartments")}
          >
            <Icons.chevronLeft className="h-4 w-4 mr-2" />
            Dairelere Dön
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {apartment.blockName} - Daire {apartment.number}
            </h2>
            <p className="text-muted-foreground">
              {apartment.floor}. Kat
              {apartment.type && ` • ${apartment.type}`}
              {apartment.squareMeters && ` • ${apartment.squareMeters} m²`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setEditingApartment(apartment)}
          >
            <Icons.settings className="h-4 w-4 mr-2" />
            Düzenle
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeletingApartment(apartment)}
          >
            <Icons.trash className="h-4 w-4 mr-2" />
            Sil
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blok</CardTitle>
            <Icons.building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apartment.blockName}</div>
            <p className="text-xs text-muted-foreground">
              Daire bulunduğu blok
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sakin Sayısı</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apartment.residents.length}</div>
            <p className="text-xs text-muted-foreground">
              {apartment.residents.length === 0 ? "Boş daire" : "Aktif sakin"}
            </p>
          </CardContent>
        </Card>
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
            <div className="text-2xl font-bold">{apartment.dues.length}</div>
            <p className="text-xs text-muted-foreground">
              Tüm dönemler
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sakinler</CardTitle>
            <CardDescription>
              Bu dairede yaşayan kişiler
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apartment.residents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Bu dairede henüz sakin bulunmuyor.
              </p>
            ) : (
              <div className="space-y-4">
                {apartment.residents.map((resident) => (
                  <div key={resident.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{resident.fullName}</p>
                      <p className="text-sm text-muted-foreground">{resident.email}</p>
                      {resident.phone && (
                        <p className="text-sm text-muted-foreground">{resident.phone}</p>
                      )}
                    </div>
                    <Badge variant="secondary">{resident.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daire Bilgileri</CardTitle>
            <CardDescription>
              Temel daire özellikleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Blok</p>
                <p className="text-sm text-muted-foreground">{apartment.blockName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Daire No</p>
                <p className="text-sm text-muted-foreground">{apartment.number}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Kat</p>
                <p className="text-sm text-muted-foreground">{apartment.floor}. Kat</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tip</p>
                <p className="text-sm text-muted-foreground">
                  {apartment.type || "Belirtilmemiş"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Metrekare</p>
                <p className="text-sm text-muted-foreground">
                  {apartment.squareMeters ? `${apartment.squareMeters} m²` : "Belirtilmemiş"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Kayıt Tarihi</p>
                <p className="text-sm text-muted-foreground">{formatDate(apartment.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {apartment.dues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Aidat Geçmişi</CardTitle>
            <CardDescription>
              Tüm aidat kayıtları ve ödeme durumları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dönem</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Son Ödeme Tarihi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ödeme Tarihi</TableHead>
                  <TableHead>Açıklama</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apartment.dues.map((due) => (
                  <TableRow key={due.id}>
                    <TableCell className="font-medium">
                      {getMonthName(due.month)} {due.year}
                    </TableCell>
                    <TableCell>{formatCurrency(due.amount)}</TableCell>
                    <TableCell>{formatDate(due.dueDate)}</TableCell>
                    <TableCell>
                      {due.isPaid ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Ödendi
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Ödenmedi
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {due.paymentDate ? formatDate(due.paymentDate) : "-"}
                    </TableCell>
                    <TableCell>
                      {due.description || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {editingApartment && (
        <EditApartmentDialog
          apartment={editingApartment}
          open={!!editingApartment}
          onOpenChange={() => setEditingApartment(null)}
          onApartmentUpdated={handleApartmentUpdated}
        />
      )}

      {deletingApartment && (
        <DeleteApartmentDialog
          apartment={deletingApartment}
          open={!!deletingApartment}
          onOpenChange={() => setDeletingApartment(null)}
          onApartmentDeleted={handleApartmentDeleted}
        />
      )}
    </div>
  );
} 