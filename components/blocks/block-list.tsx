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
    <div className="space-y-4" data-oid="_g750a-">
      <div className="flex items-center gap-2" data-oid=".6qgf9-">
        <Input
          placeholder="Blok ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
          data-oid="d6enja:"
        />
      </div>
      <div className="rounded-md border" data-oid="2x:8v2x">
        <Table data-oid="_sd.xi3">
          <TableHeader data-oid="rysjibb">
            <TableRow data-oid="90w_o7k">
              <TableHead data-oid="6hc:r.z">Blok Adı</TableHead>
              <TableHead data-oid="5-i8bgb">Oluşturulma Tarihi</TableHead>
              <TableHead data-oid="h91kcyx">Daire Sayısı</TableHead>
              <TableHead className="text-right" data-oid="mk5cm-.">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="wloc_cj">
            {filteredBlocks.length === 0 ? (
              <TableRow data-oid="mw6z7vo">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                  data-oid="07b:d_."
                >
                  Sonuç bulunamadı.
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
          data-oid="7s4._53"
        />
      )}
      {deletingBlock && (
        <DeleteBlockDialog
          block={deletingBlock}
          open={!!deletingBlock}
          onOpenChange={() => setDeletingBlock(null)}
          data-oid="uev8_6:"
        />
      )}
    </div>
  );
}
