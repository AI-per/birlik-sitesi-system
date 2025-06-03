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
    <Form {...form} data-oid="8gfebnn">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="1c5u7fr"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem data-oid="3sswy:c">
              <FormLabel data-oid=":6y:vnp">Ad Soyad</FormLabel>
              <FormControl data-oid="vg10y66">
                <Input
                  placeholder="Ahmet Yılmaz"
                  {...field}
                  data-oid="x.m_n85"
                />
              </FormControl>
              <FormMessage data-oid="-scgm6s" />
            </FormItem>
          )}
          data-oid="6_:8i43"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="gcg3ifl">
              <FormLabel data-oid="s2jhabi">E-posta</FormLabel>
              <FormControl data-oid="e23qmh:">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="gy:zte4"
                />
              </FormControl>
              <FormMessage data-oid="fifdjht" />
            </FormItem>
          )}
          data-oid="b87z-2u"
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem data-oid="4wi.6vk">
              <FormLabel data-oid="yk698--">Telefon (İsteğe bağlı)</FormLabel>
              <FormControl data-oid="ungvxke">
                <Input
                  placeholder="05XX XXX XX XX"
                  {...field}
                  data-oid="-.alb2i"
                />
              </FormControl>
              <FormMessage data-oid="eyi.5u:" />
            </FormItem>
          )}
          data-oid="xjuvfkg"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="26an29x">
              <FormLabel data-oid="svf3jy.">Şifre</FormLabel>
              <FormControl data-oid="4ak..9a">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="vma-e5y"
                />
              </FormControl>
              <FormMessage data-oid="f1dfa26" />
            </FormItem>
          )}
          data-oid="s3izlzy"
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem data-oid="kv5ak8y">
              <FormLabel data-oid="6ln865v">Şifre Tekrar</FormLabel>
              <FormControl data-oid="4l2ka_o">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="llbao2p"
                />
              </FormControl>
              <FormMessage data-oid="gk0p9h." />
            </FormItem>
          )}
          data-oid="tqigcts"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="ds063ns"
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="mo4gc-v"
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
