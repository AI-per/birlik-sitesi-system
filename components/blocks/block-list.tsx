"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { AddBlockDialog } from "@/components/blocks/add-block-dialog";
import { EditBlockDialog } from "@/components/blocks/edit-block-dialog";
import { DeleteBlockDialog } from "@/components/blocks/delete-block-dialog";
import { toast } from "sonner";
import Link from "next/link";

interface Block {
  id: string;
  name: string;
  createdAt: string;
  apartmentCount: number;
  detail_url?: string;
}

export function BlockList() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [deletingBlock, setDeletingBlock] = useState<Block | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blocks");
      if (response.ok) {
        const data = await response.json();
        setBlocks(data);
      } else {
        throw new Error("Failed to fetch blocks");
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
      toast.error("Bloklar yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (block: Block) => {
    if (block.detail_url && block.detail_url.trim() !== '') {
      router.push(block.detail_url);
    }
  };

  const handleBlockAdded = () => {
    fetchBlocks();
    setIsAddDialogOpen(false);
  };

  const handleBlockUpdated = () => {
    fetchBlocks();
    setEditingBlock(null);
  };

  const handleBlockDeleted = () => {
    fetchBlocks();
    setDeletingBlock(null);
  };

  // Define table columns
  const columns: DataTableColumn<Block>[] = [
    {
      id: "name",
      header: "Blok Adı",
      accessorKey: "name",
      sortable: true,
      sortType: "text",
      cell: (value, row) => (
        <Link 
          href={`/dashboard/blocks/${row.id}`}
          className="font-medium hover:underline"
        >
          {value}
        </Link>
      ),
    },
    {
      id: "apartmentCount",
      header: "Daire Sayısı",
      accessorKey: "apartmentCount",
      sortable: true,
      sortType: "number",
      searchable: false,
      cell: (value) => `${value} daire`,
    },
  ];

  // Render actions for each row
  const renderActions = (block: Block) => (
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
          <Link href={`/dashboard/blocks/${block.id}`}>
            <Icons.eye className="mr-2 h-4 w-4" />
            Detay
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEditingBlock(block)}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Düzenle
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setDeletingBlock(block)}
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
    <Button onClick={() => setIsAddDialogOpen(true)}>
      <Icons.plus className="mr-2 h-4 w-4" />
      Blok Ekle
    </Button>
  );

  return (
    <div className="space-y-4">
      <DataTable
        data={blocks}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Blok ara..."
        emptyMessage="Henüz blok eklenmemiş."
        loadingMessage="Bloklar yükleniyor..."
        onRowClick={handleRowClick}
        rowClickCondition={(row) => Boolean(row.detail_url && row.detail_url.trim() !== '')}
        actions={renderActions}
        topActions={topActions}
      />

      {/* Dialogs */}
      {isAddDialogOpen && (
        <AddBlockDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onBlockAdded={handleBlockAdded}
        />
      )}

      {editingBlock && (
        <EditBlockDialog
          block={editingBlock}
          open={Boolean(editingBlock)}
          onOpenChange={(open) => !open && setEditingBlock(null)}
          onBlockUpdated={handleBlockUpdated}
        />
      )}

      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={Boolean(deletingBlock)}
          onOpenChange={(open) => !open && setDeletingBlock(null)}
          onBlockDeleted={handleBlockDeleted}
        />
      )}
    </div>
  );
}
