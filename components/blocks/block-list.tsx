"use client";

import { useState } from "react";
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

export function BlockList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBlock, setEditingBlock] = useState<any | null>(null);
  const [deletingBlock, setDeletingBlock] = useState<any | null>(null);

  // Örnek blok verileri
  const blocks = [
    { id: "1", name: "A Blok", createdAt: "2023-01-15", apartmentCount: 30 },
    { id: "2", name: "B Blok", createdAt: "2023-01-15", apartmentCount: 25 },
    { id: "3", name: "C Blok", createdAt: "2023-02-20", apartmentCount: 20 },
    { id: "4", name: "D Blok", createdAt: "2023-03-10", apartmentCount: 30 },
    { id: "5", name: "E Blok", createdAt: "2023-04-05", apartmentCount: 15 },
  ];

  const filteredBlocks = blocks.filter((block) =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Blok ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blok Adı</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
              <TableHead>Daire Sayısı</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredBlocks.map((block) => (
                <TableRow key={block.id}>
                  <TableCell className="font-medium">{block.name}</TableCell>
                  <TableCell>{block.createdAt}</TableCell>
                  <TableCell>{block.apartmentCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menüyü aç</span>
                          <Icons.ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/dashboard/blocks/${block.id}`)
                          }
                        >
                          <Icons.fileText className="mr-2 h-4 w-4" />

                          <span>Detaylar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingBlock(block)}
                        >
                          <Icons.settings className="mr-2 h-4 w-4" />

                          <span>Düzenle</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeletingBlock(block)}
                          className="text-red-600"
                        >
                          <Icons.trash className="mr-2 h-4 w-4" />

                          <span>Sil</span>
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
        />
      )}
      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={!!deletingBlock}
          onOpenChange={() => setDeletingBlock(null)}
        />
      )}
    </div>
  );
}
