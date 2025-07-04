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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { AddApartmentDialog } from "@/components/apartments/add-apartment-dialog";
import { EditApartmentDialog } from "@/components/apartments/edit-apartment-dialog";
import { DeleteApartmentDialog } from "@/components/apartments/delete-apartment-dialog";
import { toast } from "sonner";
import Link from "next/link";

interface Apartment {
  id: string;
  number: string;
  floor: number;
  type: string | null;
  squareMeters: number | null;
  blockId: string;
  blockName: string;
  createdAt: string;
  residentCount: number;
  residents: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
  }>;
  unpaidDuesCount: number;
  totalUnpaidAmount: number;
  detail_url?: string;
}

interface Block {
  id: string;
  name: string;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

export function ApartmentList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<string>("all");
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(null);
  const [addingApartment, setAddingApartment] = useState(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false);

  // Handle row click for navigation
  const handleRowClick = (apartment: Apartment, event: React.MouseEvent) => {
    // Don't navigate if detail_url is not available or empty
    if (!apartment.detail_url || apartment.detail_url.trim() === '') {
      return;
    }

    // Don't navigate if clicking on dropdown menu trigger
    const target = event.target as HTMLElement;
    if (target.closest('[role="button"]') || target.closest('button')) {
      return;
    }

    // Navigate to detail page
    router.push(apartment.detail_url);
  };

  // Daireleri yükle
  const fetchApartments = async () => {
    try {
      setIsLoading(true);
      const url = selectedBlock === "all" 
        ? "/api/apartments" 
        : `/api/apartments?blockId=${selectedBlock}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Daireler yüklenirken hata oluştu");
      }
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      toast.error("Daireler yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  // Blokları yükle
  const fetchBlocks = async () => {
    try {
      setIsLoadingBlocks(true);
      const response = await fetch("/api/blocks");
      if (!response.ok) {
        throw new Error("Bloklar yüklenirken hata oluştu");
      }
      const data = await response.json();
      setBlocks(data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      toast.error("Bloklar yüklenirken hata oluştu");
    } finally {
      setIsLoadingBlocks(false);
    }
  };

  // Component mount olduğunda verileri yükle
  useEffect(() => {
    fetchBlocks();
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [selectedBlock]);

  // Filtreleme
  const filteredApartments = apartments.filter((apartment) => {
    const matchesSearch = 
      apartment.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apartment.blockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apartment.residents && apartment.residents.some(resident => 
        resident.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    return matchesSearch;
  });

  const handleApartmentAdded = () => {
    fetchApartments();
    setAddingApartment(false);
  };

  const handleApartmentUpdated = () => {
    fetchApartments();
    setEditingApartment(null);
  };

  const handleApartmentDeleted = () => {
    fetchApartments();
    setDeletingApartment(null);
  };

  // Define table columns
  const columns: DataTableColumn<Apartment>[] = [
    {
      id: "block",
      header: "Blok",
      accessorKey: "blockName",
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <Link 
          href={`/dashboard/apartments/${row.id}`}
          className="font-medium hover:underline"
        >
          {value}
        </Link>
      ),
    },
    {
      id: "number",
      header: "Daire No",
      accessorKey: "number",
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <Link 
          href={`/dashboard/apartments/${row.id}`}
          className="font-medium hover:underline"
        >
          {value}
        </Link>
      ),
    },
    {
      id: "floor",
      header: "Kat",
      accessorKey: "floor",
      sortable: true,
      sortType: "number",
      cell: (value) => `${value}. Kat`,
    },
    {
      id: "type",
      header: "Tip",
      accessorKey: "type",
      sortable: true,
      sortType: "text",
      cell: (value) => value || <span className="text-muted-foreground">-</span>,
    },
    {
      id: "squareMeters",
      header: "m²",
      accessorKey: "squareMeters",
      sortable: true,
      sortType: "number",
      searchable: false,
      cell: (value) => value ? `${value} m²` : <span className="text-muted-foreground">-</span>,
    },
    {
      id: "residents",
      header: "Konut Sakinleri",
      accessorKey: "residentCount",
      sortable: true,
      sortType: "number",
      searchable: false,
      cell: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium">{value} kişi</span>
          {row.residents && row.residents[0]?.fullName && (
            <span className="text-sm text-muted-foreground">
              {row.residents[0].fullName}
              {row.residentCount > 1 && ` +${row.residentCount - 1}`}
            </span>
          )}
        </div>
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
          <Badge variant={value > 0 ? "destructive" : "default"}>
            {value} adet
          </Badge>
          {row.totalUnpaidAmount > 0 && (
            <span className="text-xs text-muted-foreground mt-1">
              {formatCurrency(row.totalUnpaidAmount)}
            </span>
          )}
        </div>
      ),
    },
  ];

  // Render actions for each row
  const renderActions = (apartment: Apartment) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Menüyü aç</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/apartments/${apartment.id}`}>
            <Icons.eye className="mr-2 h-4 w-4" />
            Detay
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEditingApartment(apartment)}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Düzenle
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setDeletingApartment(apartment)}
          className="text-destructive focus:text-destructive"
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Sil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Top actions for the table
  const topActions = (
    <>
      <Select value={selectedBlock} onValueChange={setSelectedBlock} disabled={isLoadingBlocks}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={isLoadingBlocks ? "Yükleniyor..." : "Tüm Bloklar"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Bloklar</SelectItem>
          {blocks.map((block) => (
            <SelectItem key={block.id} value={block.id}>
              {block.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={() => setAddingApartment(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Daire Ekle
      </Button>
    </>
  );

  return (
    <div className="space-y-4">
      <DataTable
        data={filteredApartments}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Daire ara..."
        emptyMessage="Henüz daire eklenmemiş."
        loadingMessage="Daireler yükleniyor..."
        onRowClick={handleRowClick}
        rowClickCondition={(row) => Boolean(row.detail_url && row.detail_url.trim() !== '')}
        actions={renderActions}
        topActions={topActions}
      />

      {/* Dialogs */}
      {addingApartment && (
        <AddApartmentDialog
          open={addingApartment}
          onOpenChange={setAddingApartment}
          onApartmentAdded={handleApartmentAdded}
        />
      )}

      {editingApartment && (
        <EditApartmentDialog
          apartment={editingApartment}
          open={Boolean(editingApartment)}
          onOpenChange={(open) => !open && setEditingApartment(null)}
          onApartmentUpdated={handleApartmentUpdated}
        />
      )}

      {deletingApartment && (
        <DeleteApartmentDialog
          apartment={deletingApartment}
          open={Boolean(deletingApartment)}
          onOpenChange={(open) => !open && setDeletingApartment(null)}
          onApartmentDeleted={handleApartmentDeleted}
        />
      )}
    </div>
  );
} 