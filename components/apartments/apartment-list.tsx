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
import { AddApartmentDialog } from "@/components/apartments/add-apartment-dialog";
import { EditApartmentDialog } from "@/components/apartments/edit-apartment-dialog";
import { DeleteApartmentDialog } from "@/components/apartments/delete-apartment-dialog";
import { toast } from "sonner";

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
      apartment.residents.some(resident => 
        resident.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Daire ara (numara, blok, sakin adı)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedBlock} onValueChange={setSelectedBlock} disabled={isLoadingBlocks}>
            <SelectTrigger className="w-48">
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
        </div>
        <Button onClick={() => setAddingApartment(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Yeni Daire
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blok</TableHead>
              <TableHead>Daire No</TableHead>
              <TableHead>Kat</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>m²</TableHead>
              <TableHead>Sakinler</TableHead>
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
            ) : filteredApartments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {apartments.length === 0 ? "Henüz daire eklenmemiş." : "Sonuç bulunamadı."}
                </TableCell>
              </TableRow>
            ) : (
              filteredApartments.map((apartment) => (
                <TableRow 
                  key={apartment.id}
                  className={
                    apartment.detail_url && apartment.detail_url.trim() !== ''
                      ? "cursor-pointer hover:bg-muted/50 transition-colors"
                      : "cursor-default"
                  }
                  onClick={(event) => handleRowClick(apartment, event)}
                >
                  <TableCell className="font-medium">
                    {apartment.blockName}
                  </TableCell>
                  <TableCell>{apartment.number}</TableCell>
                  <TableCell>{apartment.floor}. Kat</TableCell>
                  <TableCell>
                    {apartment.type ? (
                      <Badge variant="secondary">{apartment.type}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {apartment.squareMeters ? (
                      `${apartment.squareMeters} m²`
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {apartment.residentCount > 0 ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{apartment.residentCount}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {apartment.residents[0]?.fullName}
                          {apartment.residentCount > 1 && ` +${apartment.residentCount - 1}`}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline">Boş</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {apartment.unpaidDuesCount > 0 ? (
                      <div className="flex flex-col">
                        <Badge variant="destructive" className="w-fit">
                          {apartment.unpaidDuesCount} aidat
                        </Badge>
                        <span className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(apartment.totalUnpaidAmount)}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Güncel
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
                          <Icons.ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            router.push(`/dashboard/apartments/${apartment.id}`);
                          }}
                        >
                          <Icons.fileText className="mr-2 h-4 w-4" />
                          Detaylar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(event) => {
                          event.stopPropagation();
                          setEditingApartment(apartment);
                        }}>
                          <Icons.settings className="mr-2 h-4 w-4" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeletingApartment(apartment);
                          }}
                          className="text-red-600"
                        >
                          <Icons.trash className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingApartment && (
        <EditApartmentDialog
          apartment={editingApartment}
          open={!!editingApartment}
          onOpenChange={() => setEditingApartment(null)}
          onApartmentUpdated={fetchApartments}
        />
      )}

      {deletingApartment && (
        <DeleteApartmentDialog
          apartment={deletingApartment}
          open={!!deletingApartment}
          onOpenChange={() => setDeletingApartment(null)}
          onApartmentDeleted={fetchApartments}
        />
      )}

      <AddApartmentDialog
        open={addingApartment}
        onOpenChange={setAddingApartment}
        onApartmentAdded={fetchApartments}
      />
    </div>
  );
} 