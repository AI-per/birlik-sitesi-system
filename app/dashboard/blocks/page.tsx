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
    <div className="flex flex-col gap-4" data-oid="icltl4j">
      <div className="flex items-center justify-between" data-oid=".fnhqpc">
        <h2 className="text-3xl font-bold tracking-tight" data-oid="vu1puwy">
          Bloklar
        </h2>
      </div>
      <Card data-oid="pbonx3m">
        <CardHeader data-oid="ef38lwx">
          <CardTitle data-oid="0pge:bj">Blok Listesi</CardTitle>
          <CardDescription data-oid="hp.416w">
            Sitedeki tüm blokları görüntüleyin ve yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent data-oid="cqos4mq">
          <BlockList data-oid="oguvv28" />
        </CardContent>
      </Card>
    </div>
  );
}
