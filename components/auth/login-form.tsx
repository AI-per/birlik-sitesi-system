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
    <Form {...form} data-oid=".ryx3oc">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="84k8cj7"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="3f7b42b">
              <FormLabel data-oid="yj10tjl">E-posta</FormLabel>
              <FormControl data-oid="n.01l73">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="lt-is3k"
                />
              </FormControl>
              <FormMessage data-oid="ecd9x4_" />
            </FormItem>
          )}
          data-oid="zu1_31i"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="-n6gtzq">
              <FormLabel data-oid="ug4gibe">Şifre</FormLabel>
              <FormControl data-oid="bpfq_7e">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="ip12ogk"
                />
              </FormControl>
              <FormMessage data-oid="xuj01o_" />
            </FormItem>
          )}
          data-oid="y-kn5-w"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="pzc4trj"
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="ld4xgf_"
              />
              Giriş yapılıyor...
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm" data-oid="217e9.c">
        <a href="#" className="text-primary hover:underline" data-oid="pf.ed_m">
          Şifremi unuttum
        </a>
      </div>
    </Form>
  );
}
