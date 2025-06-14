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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { EditBlockDialog } from "@/components/blocks/edit-block-dialog";
import { DeleteBlockDialog } from "@/components/blocks/delete-block-dialog";
import { AddBlockDialog } from "@/components/blocks/add-block-dialog";
import { toast } from "sonner";

interface Block {
  id: string;
  name: string;
  createdAt: string;
  apartmentCount: number;
}

export function BlockList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [deletingBlock, setDeletingBlock] = useState<Block | null>(null);
  const [addingBlock, setAddingBlock] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Blokları yükle
  const fetchBlocks = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Component mount olduğunda blokları yükle
  useEffect(() => {
    fetchBlocks();
  }, []);

  const filteredBlocks = blocks.filter((block) =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Blok ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setAddingBlock(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Yeni Blok
        </Button>
      </div>
      <div className="rounded-md border" data-oid="2x:8v2x">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blok Adı</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
              <TableHead>Daire Sayısı</TableHead>
              <TableHead className="text-right">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : filteredBlocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {blocks.length === 0 ? "Henüz blok eklenmemiş." : "Sonuç bulunamadı."}
                </TableCell>
              </TableRow>
            ) : (
              filteredBlocks.map((block) => (
                <TableRow key={block.id} data-oid="9hn99:b">
                  <TableCell className="font-medium" data-oid="bje.4kv">
                    {block.name}
                  </TableCell>
                  <TableCell data-oid="b5.jd3n">{block.createdAt}</TableCell>
                  <TableCell data-oid="ijnqhjr">
                    {block.apartmentCount}
                  </TableCell>
                  <TableCell className="text-right" data-oid="un481q8">
                    <DropdownMenu data-oid="z0jrmj9">
                      <DropdownMenuTrigger asChild data-oid="h1hj42r">
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          data-oid="5qik7vy"
                        >
                          <span className="sr-only" data-oid=".xdfx3a">
                            Menüyü aç
                          </span>
                          <Icons.ellipsis
                            className="h-4 w-4"
                            data-oid="2uh-1xz"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" data-oid="zbu2x:f">
                        <DropdownMenuLabel data-oid="bn7itt-">
                          İşlemler
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/dashboard/blocks/${block.id}`)
                          }
                          data-oid="f5.9:pb"
                        >
                          <Icons.fileText
                            className="mr-2 h-4 w-4"
                            data-oid="y4g56he"
                          />

                          <span data-oid="n9qh2pv">Detaylar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingBlock(block)}
                          data-oid="spt6r93"
                        >
                          <Icons.settings
                            className="mr-2 h-4 w-4"
                            data-oid="qta1vjs"
                          />

                          <span data-oid="ihgmwtk">Düzenle</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator data-oid="ciq091-" />
                        <DropdownMenuItem
                          onClick={() => setDeletingBlock(block)}
                          className="text-red-600"
                          data-oid="7h4gi2m"
                        >
                          <Icons.trash
                            className="mr-2 h-4 w-4"
                            data-oid="7-.nk3i"
                          />

                          <span data-oid="obd0riq">Sil</span>
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
      {editingBlock && (
        <EditBlockDialog
          block={editingBlock}
          open={!!editingBlock}
          onOpenChange={() => setEditingBlock(null)}
          onBlockUpdated={fetchBlocks}
        />
      )}
      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={!!deletingBlock}
          onOpenChange={() => setDeletingBlock(null)}
          onBlockDeleted={fetchBlocks}
        />
      )}
      <AddBlockDialog
        open={addingBlock}
        onOpenChange={setAddingBlock}
        onBlockAdded={fetchBlocks}
      />
    </div>
  );
}
