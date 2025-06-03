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
    <div className="space-y-4" data-oid="4b0f2yk">
      <div className="flex items-center gap-2" data-oid="w9fqezo">
        <Input
          placeholder="Blok ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
          data-oid="01wyjq3"
        />
      </div>
      <div className="rounded-md border" data-oid="0lgx.az">
        <Table data-oid="s96-oyu">
          <TableHeader data-oid="_zv.0m:">
            <TableRow data-oid="_k:ipuf">
              <TableHead data-oid="_3h0jkp">Blok Adı</TableHead>
              <TableHead data-oid="vwnnea8">Oluşturulma Tarihi</TableHead>
              <TableHead data-oid="qenes1p">Daire Sayısı</TableHead>
              <TableHead className="text-right" data-oid="bji5zf:">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="ofrk41h">
            {filteredBlocks.length === 0 ? (
              <TableRow data-oid="p5cfiqz">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                  data-oid="szeax74"
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredBlocks.map((block) => (
                <TableRow key={block.id} data-oid="0bxo.ih">
                  <TableCell className="font-medium" data-oid="d4qd.dy">
                    {block.name}
                  </TableCell>
                  <TableCell data-oid="rvnu8b7">{block.createdAt}</TableCell>
                  <TableCell data-oid="iivgb22">
                    {block.apartmentCount}
                  </TableCell>
                  <TableCell className="text-right" data-oid="bx9ajcq">
                    <DropdownMenu data-oid="fg-.s9n">
                      <DropdownMenuTrigger asChild data-oid="93ry-no">
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          data-oid="o0ybc_q"
                        >
                          <span className="sr-only" data-oid="8qr5v-l">
                            Menüyü aç
                          </span>
                          <Icons.ellipsis
                            className="h-4 w-4"
                            data-oid="_vu7rf_"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" data-oid="usj.c_h">
                        <DropdownMenuLabel data-oid="ke_pjed">
                          İşlemler
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/dashboard/blocks/${block.id}`)
                          }
                          data-oid="k-hmd:b"
                        >
                          <Icons.fileText
                            className="mr-2 h-4 w-4"
                            data-oid="k3k0rdz"
                          />

                          <span data-oid="-5k6.4x">Detaylar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingBlock(block)}
                          data-oid="4fc:0ra"
                        >
                          <Icons.settings
                            className="mr-2 h-4 w-4"
                            data-oid="zo6e9h_"
                          />

                          <span data-oid=".8g46og">Düzenle</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator data-oid="nmdp.o3" />
                        <DropdownMenuItem
                          onClick={() => setDeletingBlock(block)}
                          className="text-red-600"
                          data-oid="4dcn02_"
                        >
                          <Icons.trash
                            className="mr-2 h-4 w-4"
                            data-oid="0.-49ky"
                          />

                          <span data-oid="88cajl_">Sil</span>
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
          data-oid="24eiv0w"
        />
      )}
      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={!!deletingBlock}
          onOpenChange={() => setDeletingBlock(null)}
          data-oid="g6a6lbz"
        />
      )}
    </div>
  );
}
