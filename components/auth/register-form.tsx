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
    <Form {...form} data-oid="f3_j2cn">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="3bd70ks"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem data-oid=":z:mtwn">
              <FormLabel data-oid="857vlld">Ad Soyad</FormLabel>
              <FormControl data-oid="wpdahd9">
                <Input
                  placeholder="Ahmet Yılmaz"
                  {...field}
                  data-oid="gzd_s.e"
                />
              </FormControl>
              <FormMessage data-oid="2:2xkny" />
            </FormItem>
          )}
          data-oid="hsfa8le"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="ku5bjmw">
              <FormLabel data-oid="snao52m">E-posta</FormLabel>
              <FormControl data-oid="bfohjqq">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="47tb1p:"
                />
              </FormControl>
              <FormMessage data-oid="vp6fjti" />
            </FormItem>
          )}
          data-oid="5xid-0y"
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem data-oid="a_t51pn">
              <FormLabel data-oid="ywl-j7s">Telefon (İsteğe bağlı)</FormLabel>
              <FormControl data-oid="3qjizk.">
                <Input
                  placeholder="05XX XXX XX XX"
                  {...field}
                  data-oid="1n1nheq"
                />
              </FormControl>
              <FormMessage data-oid="sdmnga9" />
            </FormItem>
          )}
          data-oid=".a9ivi6"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="o8k4vhb">
              <FormLabel data-oid="q.:njng">Şifre</FormLabel>
              <FormControl data-oid="b:igw-:">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="nduuykl"
                />
              </FormControl>
              <FormMessage data-oid="yi_sbg-" />
            </FormItem>
          )}
          data-oid="_:2ob.c"
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem data-oid=".x0kej4">
              <FormLabel data-oid="r-cpsp2">Şifre Tekrar</FormLabel>
              <FormControl data-oid="t22r:y7">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="eecvs9z"
                />
              </FormControl>
              <FormMessage data-oid=":bwxw27" />
            </FormItem>
          )}
          data-oid="5zmlav3"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="o7gsz_."
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="yvb39yz"
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
