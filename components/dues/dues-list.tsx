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
import { AddDueDialog } from "./add-due-dialog";
import { EditDueDialog } from "./edit-due-dialog";
import { DeleteDueDialog } from "./delete-due-dialog";
import { PayDueDialog } from "./pay-due-dialog";
import { BulkDueCreator } from "@/components/dashboard/bulk-due-creator";

interface Due {
  id: string;
  apartmentId: string;
  amount: number;
  month: number;
  year: number;
  dueDate: string;
  isPaid: boolean;
  paidDate: string | null;
  paidAmount: number | null;
  createdAt: string;
  updatedAt: string;
  apartment: {
    id: string;
    number: string;
    floor: number;
    block: {
      id: string;
      name: string;
    };
    resident: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
    };
  };
}

interface DuesListProps {
  currentUserId: string;
  currentUserRole: string;
}

export function DuesList({ currentUserId, currentUserRole }: DuesListProps) {
  const [dues, setDues] = useState<Due[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [addingDue, setAddingDue] = useState(false);
  const [editingDue, setEditingDue] = useState<Due | null>(null);
  const [deletingDue, setDeletingDue] = useState<Due | null>(null);
  const [payingDue, setPayingDue] = useState<Due | null>(null);
  const [showBulkCreator, setShowBulkCreator] = useState(false);

  useEffect(() => {
    fetchDues();
  }, []);

  const fetchDues = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dues');
      if (response.ok) {
        const data = await response.json();
        setDues(data);
      }
    } catch (error) {
      console.error('Error fetching dues:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtreleme
  const filteredDues = dues.filter((due) => {
    const matchesSearch = 
      due.apartment.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      due.apartment.resident.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      due.apartment.block.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMonth = selectedMonth === "all" || due.month === parseInt(selectedMonth);
    const matchesYear = selectedYear === "all" || due.year === parseInt(selectedYear);
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "paid" && due.isPaid) ||
      (selectedStatus === "unpaid" && !due.isPaid);
    
    return matchesSearch && matchesMonth && matchesYear && matchesStatus;
  });

  // Benzersiz yılları al
  const uniqueYears = Array.from(new Set(dues.map(due => due.year))).sort((a, b) => b - a);

  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  // Yetki kontrolü
  const canManageDues = currentUserRole === 'MANAGER' || currentUserRole === 'ADMIN';

  // İstatistikler
  const totalDues = filteredDues.length;
  const paidDues = filteredDues.filter(due => due.isPaid).length;
  const unpaidDues = totalDues - paidDues;
  const totalAmount = filteredDues.reduce((sum, due) => sum + due.amount, 0);
  const paidAmount = filteredDues.filter(due => due.isPaid).reduce((sum, due) => sum + (due.paidAmount || 0), 0);
  const unpaidAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-4">
      {/* İstatistikler */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Toplam Aidat</p>
            <Icons.dollar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{totalDues}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Ödenen</p>
            <Icons.check className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{paidDues}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(paidAmount)}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Ödenmemiş</p>
            <Icons.clock className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600">{unpaidDues}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(unpaidAmount)}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Tahsilat Oranı</p>
            <Icons.chart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {totalDues > 0 ? Math.round((paidDues / totalDues) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            {paidDues}/{totalDues} aidat
          </p>
        </div>
      </div>

      {/* Toplu Aidat Oluşturma */}
      {canManageDues && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Toplu İşlemler</h3>
            <Button
              variant="outline"
              onClick={() => setShowBulkCreator(!showBulkCreator)}
            >
              <Icons.plus className="mr-2 h-4 w-4" />
              Toplu Aidat Oluştur
            </Button>
          </div>
          {showBulkCreator && (
            <BulkDueCreator />
          )}
        </div>
      )}

      {/* Filtreler */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Daire, sakin veya blok ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Ay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Aylar</SelectItem>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {getMonthName(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Yıl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Yıllar</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="paid">Ödenen</SelectItem>
              <SelectItem value="unpaid">Ödenmemiş</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {canManageDues && (
          <Button onClick={() => setAddingDue(true)}>
            <Icons.plus className="mr-2 h-4 w-4" />
            Yeni Aidat
          </Button>
        )}
      </div>

      {/* Tablo */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Daire</TableHead>
              <TableHead>Sakin</TableHead>
              <TableHead>Dönem</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Son Ödeme</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Ödeme Tarihi</TableHead>
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
            ) : filteredDues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {dues.length === 0 ? "Henüz aidat eklenmemiş." : "Sonuç bulunamadı."}
                </TableCell>
              </TableRow>
            ) :
              filteredDues.map((due) => (
                <TableRow key={due.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{due.apartment.block.name} - {due.apartment.number}</span>
                      <span className="text-xs text-muted-foreground">
                        {due.apartment.floor}. Kat
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{due.apartment.resident.fullName}</span>
                      <span className="text-xs text-muted-foreground">
                        {due.apartment.resident.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{getMonthName(due.month)} {due.year}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatCurrency(due.amount)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatDate(due.dueDate)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={due.isPaid ? "default" : "destructive"}>
                      {due.isPaid ? "Ödendi" : "Ödenmedi"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {due.isPaid && due.paidDate ? (
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDate(due.paidDate)}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(due.paidAmount || 0)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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
                        {!due.isPaid && (
                          <DropdownMenuItem onClick={() => setPayingDue(due)}>
                            <Icons.check className="mr-2 h-4 w-4" />
                            Ödeme Kaydet
                          </DropdownMenuItem>
                        )}
                        {canManageDues && (
                          <>
                            <DropdownMenuItem onClick={() => setEditingDue(due)}>
                              <Icons.edit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            {!due.isPaid && (
                              <DropdownMenuItem 
                                onClick={() => setDeletingDue(due)}
                                className="text-red-600"
                              >
                                <Icons.trash className="mr-2 h-4 w-4" />
                                Sil
                              </DropdownMenuItem>
                            )}
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

      {/* Dialoglar */}
      {canManageDues && (
        <AddDueDialog
          open={addingDue}
          onOpenChange={setAddingDue}
          onDueAdded={fetchDues}
        />
      )}

      {editingDue && canManageDues && (
        <EditDueDialog
          due={editingDue}
          open={!!editingDue}
          onOpenChange={(open) => !open && setEditingDue(null)}
          onDueUpdated={fetchDues}
        />
      )}

      {deletingDue && canManageDues && (
        <DeleteDueDialog
          due={deletingDue}
          open={!!deletingDue}
          onOpenChange={(open) => !open && setDeletingDue(null)}
          onDueDeleted={fetchDues}
        />
      )}

      {payingDue && (
        <PayDueDialog
          due={payingDue}
          open={!!payingDue}
          onOpenChange={(open) => !open && setPayingDue(null)}
          onPaymentRecorded={fetchDues}
        />
      )}
    </div>
  );
} 