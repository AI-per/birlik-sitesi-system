"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "İsim en az 2 karakter olmalıdır.",
    }),
    email: z.string().email({
      message: "Geçerli bir e-posta adresi giriniz.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Geçerli bir telefon numarası giriniz.",
      })
      .optional(),
    password: z.string().min(6, {
      message: "Şifre en az 6 karakter olmalıdır.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Burada gerçek API çağrısı yapılacak
      console.log(values);

      // Başarılı kayıt simülasyonu
      setTimeout(() => {
        toast({
          title: "Kayıt başarılı!",
          description: "Hesabınız oluşturuldu. Giriş yapabilirsiniz.",
        });
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Kayıt başarısız!",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form} data-oid="qi3igwi">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="mt7cjm5"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem data-oid="_gljgn1">
              <FormLabel data-oid="i6tzkbm">Ad Soyad</FormLabel>
              <FormControl data-oid="7n:oiwr">
                <Input
                  placeholder="Ahmet Yılmaz"
                  {...field}
                  data-oid="_awlml4"
                />
              </FormControl>
              <FormMessage data-oid="k3-dhq_" />
            </FormItem>
          )}
          data-oid="31.5g00"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="h2nc8v2">
              <FormLabel data-oid="7q8cx_c">E-posta</FormLabel>
              <FormControl data-oid="azv-2z5">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="5ud_-.n"
                />
              </FormControl>
              <FormMessage data-oid="j_s3.v1" />
            </FormItem>
          )}
          data-oid="wfht4ow"
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem data-oid="ia59j:h">
              <FormLabel data-oid="ngfwr-3">Telefon (İsteğe bağlı)</FormLabel>
              <FormControl data-oid="78aaha-">
                <Input
                  placeholder="05XX XXX XX XX"
                  {...field}
                  data-oid="60016f8"
                />
              </FormControl>
              <FormMessage data-oid="qt.bfld" />
            </FormItem>
          )}
          data-oid="bs9p:_c"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="8r4dx8z">
              <FormLabel data-oid="cv:uxq5">Şifre</FormLabel>
              <FormControl data-oid="yy2l5lf">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="b6ntamr"
                />
              </FormControl>
              <FormMessage data-oid="t.7-aow" />
            </FormItem>
          )}
          data-oid="6nh5occ"
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem data-oid="mr207nj">
              <FormLabel data-oid="a5q6klu">Şifre Tekrar</FormLabel>
              <FormControl data-oid="te7._4x">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="kvaqv8o"
                />
              </FormControl>
              <FormMessage data-oid="kxy:0ns" />
            </FormItem>
          )}
          data-oid="pq8v:3p"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="ubashpd"
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="nhsfmv3"
              />
              Kayıt yapılıyor...
            </>
          ) : (
            "Kayıt Ol"
          )}
        </Button>
      </form>
    </Form>
  );
}
