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

const formSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Burada gerçek API çağrısı yapılacak
      console.log(values);

      // Başarılı giriş simülasyonu
      setTimeout(() => {
        toast({
          title: "Giriş başarılı!",
          description: "Yönlendiriliyorsunuz...",
        });
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Giriş başarısız!",
        description: "E-posta veya şifre hatalı.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form} data-oid="9687xqh">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="ay8_0vt"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="sn8-z_9">
              <FormLabel data-oid="tmkie4c">E-posta</FormLabel>
              <FormControl data-oid="12q6e_m">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="hk82mr6"
                />
              </FormControl>
              <FormMessage data-oid="af7vnzv" />
            </FormItem>
          )}
          data-oid=":-ofx.k"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="58r1b0g">
              <FormLabel data-oid="oyf5uap">Şifre</FormLabel>
              <FormControl data-oid="s3ior_k">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="f23y8dh"
                />
              </FormControl>
              <FormMessage data-oid="-aduu8v" />
            </FormItem>
          )}
          data-oid="lp:j136"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="0vr_8y9"
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="gkh4_21"
              />
              Giriş yapılıyor...
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm" data-oid="aiqb0bw">
        <a href="#" className="text-primary hover:underline" data-oid="c2n77-v">
          Şifremi unuttum
        </a>
      </div>
    </Form>
  );
}
