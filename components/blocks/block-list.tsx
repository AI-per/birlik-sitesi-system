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
    <div className="space-y-4" data-oid="s0frstf">
      <div className="flex items-center gap-2" data-oid="si6q8a4">
        <Input
          placeholder="Blok ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
          data-oid="gv8hw1."
        />
      </div>
      <div className="rounded-md border" data-oid=":70ya95">
        <Table data-oid="aa7.1cc">
          <TableHeader data-oid="lo4uq.z">
            <TableRow data-oid="fl4:22v">
              <TableHead data-oid="mm855ga">Blok Adı</TableHead>
              <TableHead data-oid="8ah5zr8">Oluşturulma Tarihi</TableHead>
              <TableHead data-oid="ulu5qpe">Daire Sayısı</TableHead>
              <TableHead className="text-right" data-oid="ylk10s:">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="1uldkyc">
            {filteredBlocks.length === 0 ? (
              <TableRow data-oid="egcy9w4">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                  data-oid="kz2i:hk"
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredBlocks.map((block) => (
                <TableRow key={block.id} data-oid="geei4vx">
                  <TableCell className="font-medium" data-oid="wx1pl2q">
                    {block.name}
                  </TableCell>
                  <TableCell data-oid="t035:b.">{block.createdAt}</TableCell>
                  <TableCell data-oid="ov25ybd">
                    {block.apartmentCount}
                  </TableCell>
                  <TableCell className="text-right" data-oid="-ktib.-">
                    <DropdownMenu data-oid="rsuoyj-">
                      <DropdownMenuTrigger asChild data-oid="_f34fzv">
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          data-oid="bc328o4"
                        >
                          <span className="sr-only" data-oid="a-oe.64">
                            Menüyü aç
                          </span>
                          <Icons.ellipsis
                            className="h-4 w-4"
                            data-oid="f5155-c"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" data-oid="azsii3y">
                        <DropdownMenuLabel data-oid="1:obu9o">
                          İşlemler
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/dashboard/blocks/${block.id}`)
                          }
                          data-oid="-:cx5bh"
                        >
                          <Icons.fileText
                            className="mr-2 h-4 w-4"
                            data-oid="-uglm.v"
                          />

                          <span data-oid="hcu_19w">Detaylar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingBlock(block)}
                          data-oid="4f77h6l"
                        >
                          <Icons.settings
                            className="mr-2 h-4 w-4"
                            data-oid="nv95ef2"
                          />

                          <span data-oid="iv-2hil">Düzenle</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator data-oid="thvh-be" />
                        <DropdownMenuItem
                          onClick={() => setDeletingBlock(block)}
                          className="text-red-600"
                          data-oid="6j0mj:."
                        >
                          <Icons.trash
                            className="mr-2 h-4 w-4"
                            data-oid="05j9x_5"
                          />

                          <span data-oid="h1wc2-p">Sil</span>
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
          data-oid="xbuzu85"
        />
      )}
      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={!!deletingBlock}
          onOpenChange={() => setDeletingBlock(null)}
          data-oid="wklb3c4"
        />
      )}
    </div>
  );
}
