import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlockList } from "@/components/blocks/block-list";
import { CreateBlockDialog } from "@/components/blocks/create-block-dialog";

export default function BlocksPage() {
  return (
    <div className="flex flex-col gap-4" data-oid="e_rix0o">
      <div className="flex items-center justify-between" data-oid="wza1itf">
        <h2 className="text-3xl font-bold tracking-tight" data-oid="0t.h384">
          Bloklar
        </h2>
        <CreateBlockDialog data-oid="luq8b2p" />
      </div>
      <Card data-oid="jzyi7::">
        <CardHeader data-oid="4dzj3bj">
          <CardTitle data-oid="bmne:i.">Blok Listesi</CardTitle>
          <CardDescription data-oid="6_5xfdz">
            Sitedeki tüm blokları görüntüleyin ve yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent data-oid="i7d9e76">
          <BlockList data-oid="5gc:afm" />
        </CardContent>
      </Card>
    </div>
  );
}
