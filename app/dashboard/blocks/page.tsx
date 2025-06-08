import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlockList } from "@/components/blocks/block-list";

export default function BlocksPage() {
  return (
    <div className="flex flex-col gap-4" data-oid="hrc9u.s">
      <div className="flex items-center justify-between" data-oid="lmy09vd">
        <h2 className="text-3xl font-bold tracking-tight" data-oid=":u64zvj">
          Bloklar
        </h2>
      </div>
      <Card data-oid="69zpmbo">
        <CardHeader data-oid="nqfuwlu">
          <CardTitle data-oid="5xd6784">Blok Listesi</CardTitle>
          <CardDescription data-oid="l7eczq2">
            Sitedeki tüm blokları görüntüleyin ve yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent data-oid="c5n:as-">
          <BlockList data-oid="6_v7n0e" />
        </CardContent>
      </Card>
    </div>
  );
}
