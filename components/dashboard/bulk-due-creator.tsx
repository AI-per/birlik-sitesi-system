"use client";

import { useState } from "react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

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
});

type FormData = z.infer<typeof formSchema>;

export function BulkDueCreator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response = await fetch("/api/dues/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

    toast.success("Aidatlar başarıyla oluşturuldu.", {
      description: "Tüm daireler için aidat kayıtları oluşturuldu.",
    });

    router.refresh();
  }

  const renderInput = (
    { field }: { field: ControllerRenderProps<FormData, any> },
    type: string,
    placeholder: string,
  ) => (
    <FormItem data-oid="q0j5-l5">
      <FormLabel data-oid="0-2qq8c">{placeholder}</FormLabel>
      <FormControl data-oid="v52dv4x">
        <Input
          type={type}
          placeholder={placeholder}
          {...field}
          data-oid="putaylp"
        />
      </FormControl>
      <FormMessage data-oid="i9lzmwr" />
    </FormItem>
  );

  return (
    <Card data-oid="-5.hn-4">
      <CardHeader data-oid="5:fik1n">
        <CardTitle data-oid="fx:ns_c">Toplu Aidat Oluştur</CardTitle>
        <CardDescription data-oid="am2:yut">
          Sistemdeki tüm daireler için tek seferde aylık aidat oluşturun.
        </CardDescription>
      </CardHeader>
      <CardContent data-oid="-.my_ee">
        <Form {...form} data-oid="la9r_a4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            data-oid="srdv9md"
          >
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              data-oid=":h60-e:"
            >
              <FormField
                control={form.control}
                name="amount"
                render={(props) =>
                  renderInput(props, "number", "Aidat Tutarı (₺)")
                }
                data-oid="m6ba.js"
              />

              <FormField
                control={form.control}
                name="month"
                render={(props) => renderInput(props, "number", "Ay")}
                data-oid="qqh0_2-"
              />

              <FormField
                control={form.control}
                name="year"
                render={(props) => renderInput(props, "number", "Yıl")}
                data-oid="jbas44n"
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={(props) =>
                  renderInput(props, "date", "Son Ödeme Tarihi")
                }
                data-oid="sgsa_pd"
              />
            </div>
            <Button type="submit" disabled={isLoading} data-oid="7oprf9o">
              {isLoading
                ? "Oluşturuluyor..."
                : "Tüm Daireler İçin Aidat Oluştur"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
