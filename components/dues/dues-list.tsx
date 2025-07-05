"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { AddDueDialog } from "./add-due-dialog";
import { EditDueDialog } from "./edit-due-dialog";
import { DeleteDueDialog } from "./delete-due-dialog";
import { PayDueDialog } from "./pay-due-dialog";
import { BulkDueCreator } from "@/components/dashboard/bulk-due-creator";
import { toast } from "sonner";

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
  currentUserId?: string;
  currentUserRole?: string;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR');
};

const getMonthName = (month: number): string => {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  return months[month - 1] || month.toString();
};

export function DuesList({ currentUserId, currentUserRole }: DuesListProps) {
  const [dues, setDues] = useState<Due[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDue, setEditingDue] = useState<Due | null>(null);
  const [deletingDue, setDeletingDue] = useState<Due | null>(null);
  const [payingDue, setPayingDue] = useState<Due | null>(null);
  const [showBulkCreator, setShowBulkCreator] = useState(false);
  
  // Bulk selection state
  const [selectedDues, setSelectedDues] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const router = useRouter();

  useEffect(() => {
    fetchDues();
  }, []);

  const fetchDues = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/dues');
      if (!response.ok) {
        throw new Error('Aidatlar alınamadı');
      }
      
      const data = await response.json();
      setDues(data);
    } catch (error) {
      console.error('FetchDues error:', error);
      toast.error('Aidatlar yüklenirken hata oluştu');
      setDues([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDueAdded = () => {
    fetchDues();
    setIsAddDialogOpen(false);
  };

  const handleDueUpdated = () => {
    fetchDues();
    setEditingDue(null);
  };

  const handleDueDeleted = () => {
    fetchDues();
    setDeletingDue(null);
  };

  const handleDuePaid = () => {
    fetchDues();
    setPayingDue(null);
  };

  const handleBulkCreated = () => {
    fetchDues();
    setShowBulkCreator(false);
  };

  // Handle row click to navigate to apartment detail
  const handleRowClick = (due: Due, event: React.MouseEvent) => {
    if (due.apartment?.id) {
      router.push(`/dashboard/apartments/${due.apartment.id}`);
    }
  };

  // Bulk operation handlers
  const handleSelectDue = (dueId: string, checked: boolean) => {
    if (checked) {
      setSelectedDues(prev => [...prev, dueId]);
    } else {
      setSelectedDues(prev => prev.filter(id => id !== dueId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedDues(filteredDues.map(due => due.id));
    } else {
      setSelectedDues([]);
    }
  };

  const handleBulkStatusUpdate = async (status: 'paid' | 'unpaid') => {
    if (selectedDues.length === 0) {
      toast.error("Lütfen en az bir aidat seçin");
      return;
    }

    try {
      setIsBulkLoading(true);
      
      // For paid status, use the current user as the payer
      const response = await fetch('/api/dues/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dueIds: selectedDues,
          status,
          payerId: currentUserId // Use current user as payer
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Güncelleme başarısız');
      }

      const result = await response.json();
      
      toast.success(result.message);
      
      // Show additional info if there were skipped items or errors
      if (result.results.skipped > 0) {
        toast.info(`${result.results.skipped} aidat zaten ${status === 'paid' ? 'ödendi' : 'ödenmedi'} durumunda olduğu için atlandı`);
      }
      
      if (result.results.errors.length > 0) {
        toast.error(`${result.results.errors.length} aidatta hata oluştu`);
      }

      // Refresh data and clear selections
      fetchDues();
      setSelectedDues([]);
      setSelectAll(false);
      
    } catch (error) {
      console.error('Bulk update error:', error);
      toast.error(error instanceof Error ? error.message : 'Toplu güncelleme sırasında hata oluştu');
    } finally {
      setIsBulkLoading(false);
    }
  };

  // Filter dues based on selected criteria
  const filteredDues = dues.filter((due) => {
    if (statusFilter !== "all") {
      const isPaid = statusFilter === "paid";
      if (due.isPaid !== isPaid) return false;
    }
    
    if (monthFilter !== "all" && due.month !== parseInt(monthFilter)) return false;
    if (yearFilter !== "all" && due.year !== parseInt(yearFilter)) return false;
    
    return true;
  });

  // Update selectAll state when filtered dues or selections change
  useEffect(() => {
    if (filteredDues.length === 0) {
      setSelectAll(false);
    } else {
      const allSelected = filteredDues.every(due => selectedDues.includes(due.id));
      setSelectAll(allSelected);
    }
  }, [filteredDues, selectedDues]);

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Define table columns
  const columns: DataTableColumn<Due>[] = [
    // Selection checkbox column
    {
      id: "select",
      header: "",
      accessorKey: "id",
      sortable: false,
      searchable: false,
      cell: (value, row) => (
        <Checkbox
          checked={selectedDues.includes(row.id)}
          onCheckedChange={(checked) => handleSelectDue(row.id, !!checked)}
          aria-label={`Satır seç`}
        />
      ),
    },
    {
      id: "apartment",
      header: "Daire",
      accessorFn: (row) => `${row.apartment.block.name} - ${row.apartment.number}`,
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.apartment.block.name} - {row.apartment.number}</span>
          <span className="text-xs text-muted-foreground">
            {row.apartment.floor}. Kat
          </span>
        </div>
      ),
    },
    {
      id: "resident",
      header: "Konut Sakini",
      accessorFn: (row) => row.apartment.resident.fullName,
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.apartment.resident.fullName}</span>
          <span className="text-xs text-muted-foreground">
            {row.apartment.resident.phone}
          </span>
        </div>
      ),
    },
    {
      id: "period",
      header: "Dönem",
      accessorFn: (row) => `${row.year}-${row.month.toString().padStart(2, '0')}`,
      sortable: true,
      sortType: "text",
      searchable: false,
      cell: (value, row) => (
        <div className="flex flex-col">
          <span>{getMonthName(row.month)} {row.year}</span>
        </div>
      ),
    },
    {
      id: "amount",
      header: "Tutar",
      accessorKey: "amount",
      sortable: true,
      sortType: "number",
      searchable: false,
      cell: (value) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      ),
    },
    {
      id: "dueDate",
      header: "Son Ödeme Tarihi",
      accessorKey: "dueDate",
      sortable: true,
      sortType: "date",
      searchable: false,
      cell: (value) => (
        <span className="text-sm">{formatDate(value)}</span>
      ),
    },
    {
      id: "status",
      header: "Durum",
      accessorKey: "isPaid",
      sortable: true,
      sortType: "text",
      searchable: false,
      cell: (value) => (
        <Badge variant={value ? "default" : "destructive"}>
          {value ? "Ödendi" : "Ödenmedi"}
        </Badge>
      ),
    },
    {
      id: "paidDate",
      header: "Ödeme Tarihi",
      accessorKey: "paidDate",
      sortable: true,
      sortType: "date",
      searchable: false,
      cell: (value) => (
        value ? (
          <span className="text-sm">{formatDate(value)}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      ),
    },
  ];

  // Render actions for each row
  const renderActions = (due: Due) => (
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
            <Icons.billing className="mr-2 h-4 w-4" />
            Ödeme Al
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => setEditingDue(due)}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Düzenle
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setDeletingDue(due)}
          className="text-destructive focus:text-destructive"
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Sil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Top actions and filters for the table
  const topActions = (
    <>
      {/* Bulk Selection Controls */}
      {filteredDues.length > 0 && (
        <>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              aria-label="Tümünü seç"
            />
            <span className="text-sm text-muted-foreground">
              Tümünü seç ({filteredDues.length})
            </span>
          </div>
          
          {/* Bulk Action Buttons */}
          {selectedDues.length > 0 && (
            <>
              <div className="text-sm text-muted-foreground">
                {selectedDues.length} aidat seçildi
              </div>
              <Button
                onClick={() => handleBulkStatusUpdate('paid')}
                disabled={isBulkLoading}
                variant="default"
                size="sm"
              >
                {isBulkLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.check className="mr-2 h-4 w-4" />
                )}
                Ödendi İşaretle
              </Button>
              <Button
                onClick={() => handleBulkStatusUpdate('unpaid')}
                disabled={isBulkLoading}
                variant="outline"
                size="sm"
              >
                {isBulkLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.close className="mr-2 h-4 w-4" />
                )}
                Ödenmedi İşaretle
              </Button>
            </>
          )}
        </>
      )}

      {/* Filter Controls */}
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Durum" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="paid">Ödenen</SelectItem>
          <SelectItem value="unpaid">Ödenmemiş</SelectItem>
        </SelectContent>
      </Select>

      <Select value={monthFilter} onValueChange={setMonthFilter}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Ay" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Aylar</SelectItem>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {getMonthName(i + 1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={yearFilter} onValueChange={setYearFilter}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Yıl" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Yıllar</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Action Buttons */}
      <Button onClick={() => setShowBulkCreator(true)} variant="outline">
        <Icons.layers className="mr-2 h-4 w-4" />
        Toplu Aidat
      </Button>
      
      <Button onClick={() => setIsAddDialogOpen(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Aidat Ekle
      </Button>
    </>
  );

  return (
    <div className="space-y-4">
      <DataTable
        data={filteredDues}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Aidat ara..."
        emptyMessage="Henüz aidat eklenmemiş."
        loadingMessage="Aidatlar yükleniyor..."
        actions={renderActions}
        topActions={topActions}
        onRowClick={handleRowClick}
        className="[&_tbody_tr]:cursor-pointer [&_tbody_tr:hover]:bg-muted/50"
      />

      {/* Dialogs */}
      {isAddDialogOpen && (
        <AddDueDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onDueAdded={handleDueAdded}
        />
      )}

      {editingDue && (
        <EditDueDialog
          due={editingDue}
          open={Boolean(editingDue)}
          onOpenChange={(open) => !open && setEditingDue(null)}
          onDueUpdated={handleDueUpdated}
        />
      )}

      {deletingDue && (
        <DeleteDueDialog
          due={deletingDue}
          open={Boolean(deletingDue)}
          onOpenChange={(open) => !open && setDeletingDue(null)}
          onDueDeleted={handleDueDeleted}
        />
      )}

      {payingDue && (
        <PayDueDialog
          due={payingDue}
          open={Boolean(payingDue)}
          onOpenChange={(open) => !open && setPayingDue(null)}
          onDuePaid={handleDuePaid}
        />
      )}

      {showBulkCreator && (
        <BulkDueCreator
          open={showBulkCreator}
          onOpenChange={setShowBulkCreator}
          onBulkCreated={handleBulkCreated}
        />
      )}
    </div>
  );
} 