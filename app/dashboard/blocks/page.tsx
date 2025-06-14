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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Bloklar
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Blok Listesi</CardTitle>
          <CardDescription>
            Sitedeki tüm blokları görüntüleyin ve yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlockList />
        </CardContent>
      </Card>
    </div>
  );
}
