"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  amount: z.coerce.number().positive("Tutar pozitif olmalıdır."),
  month: z.coerce
    .number()
    .min(1, "Geçerli bir ay girin.")
    .max(12, "Geçerli bir ay girin."),
  year: z.coerce
    .number()
    .min(new Date().getFullYear(), "Yıl, geçmiş bir yıl olamaz."),
  dueDate: z.string().refine((val: string) => !isNaN(Date.parse(val)), {
    message: "Geçerli bir tarih gereklidir.",
  }),
  blockId: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Block {
  id: string;
  name: string;
}

export function BulkDueCreator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      blockId: "all",
    },
  });

  // Fetch blocks on component mount
  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      setIsLoadingBlocks(true);
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
      setIsLoadingBlocks(false);
    }
  };

  // Auto-set due date when month or year changes
  const watchMonth = form.watch("month");
  const watchYear = form.watch("year");

  useEffect(() => {
    if (watchMonth && watchYear) {
      const lastDayOfMonth = new Date(watchYear, watchMonth, 0);
      const formattedDate = lastDayOfMonth.toISOString().split('T')[0];
      form.setValue("dueDate", formattedDate);
    }
  }, [watchMonth, watchYear, form]);

  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response = await fetch("/api/dues/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        blockId: data.blockId === "all" ? undefined : data.blockId,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      try {
        const error = await response.json();
        return toast.error("Bir hata oluştu.", {
          description: error.message || "Lütfen daha sonra tekrar deneyin.",
        });
      } catch {
        return toast.error("Bir hata oluştu.", {
          description: "Sunucudan geçerli bir yanıt alınamadı.",
        });
      }
    }

    const selectedBlock = data.blockId === "all" ? "tüm bloklar" : blocks.find(b => b.id === data.blockId)?.name || "seçilen blok";
    toast.success("Aidatlar başarıyla oluşturuldu.", {
      description: `${selectedBlock} için aidat kayıtları oluşturuldu.`,
    });

    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Toplu Aidat Oluştur</CardTitle>
        <CardDescription>
          Seçilen blok(lar)daki tüm daireler için tek seferde aylık aidat oluşturun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aidat Tutarı (₺)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ay</FormLabel>
                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ay seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <SelectItem key={m} value={m.toString()}>
                            {getMonthName(m)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yıl</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2024"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blockId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blok</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} disabled={isLoadingBlocks}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingBlocks ? "Yükleniyor..." : "Blok seçin"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Tüm Bloklar</SelectItem>
                        {blocks.map((block) => (
                          <SelectItem key={block.id} value={block.id}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Son Ödeme Tarihi</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {watchMonth && watchYear && (
              <p className="text-xs text-muted-foreground">
                Otomatik son ödeme tarihi: {new Date(watchYear, watchMonth, 0).toLocaleDateString('tr-TR')} (Ayın son günü)
              </p>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Oluşturuluyor..."
                : `${form.watch("blockId") === "all" ? "Tüm Bloklar" : "Seçilen Blok"} İçin Aidat Oluştur`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
