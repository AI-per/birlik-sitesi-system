import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { db } from "@/lib/db";

interface BlockDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BlockDetailPage({ params }: BlockDetailPageProps) {
  const block = await db.block.findUnique({
    where: { id: params.id },
    include: {
      apartments: {
        include: {
          residents: true,
        },
        orderBy: [
          { floor: 'asc' },
          { number: 'asc' },
        ],
      },
    },
  });

  if (!block) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
                     <Link href="/dashboard/blocks">
             <Button variant="ghost" size="sm">
               <Icons.chevronLeft className="mr-2 h-4 w-4" />
               Geri
             </Button>
           </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {block.name} Detayları
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blok Bilgileri</CardTitle>
            <CardDescription>
              {block.name} bloğuna ait genel bilgiler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Blok Adı:</span>
              <span>{block.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Oluşturulma Tarihi:</span>
              <span>{block.createdAt.toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Toplam Daire Sayısı:</span>
              <span>{block.apartments.length}</span>
            </div>
                         <div className="flex justify-between">
               <span className="font-medium">Dolu Daire Sayısı:</span>
               <span>{block.apartments.filter((apt: any) => apt.residents.length > 0).length}</span>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daire Listesi</CardTitle>
            <CardDescription>
              {block.name} bloğundaki daireler
            </CardDescription>
          </CardHeader>
          <CardContent>
            {block.apartments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Bu blokta henüz daire bulunmuyor.
              </p>
            ) : (
                             <div className="space-y-2 max-h-96 overflow-y-auto">
                 {block.apartments.map((apartment: any) => (
                  <Link
                    key={apartment.id}
                    href={`/dashboard/apartments/${apartment.id}`}
                    className="block"
                  >
                    <div
                      className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="font-medium">
                          Daire {apartment.number}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {apartment.floor}. Kat
                        </span>
                        {apartment.type && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({apartment.type})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {apartment.residents.length > 0 ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Dolu
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Boş
                          </span>
                        )}
                        <Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 