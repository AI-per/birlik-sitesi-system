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
    <Form {...form} data-oid="otfzwiy">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="w9pgk0n"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem data-oid="5bycslp">
              <FormLabel data-oid="l2u6zls">E-posta</FormLabel>
              <FormControl data-oid="rlgs9qg">
                <Input
                  placeholder="ornek@email.com"
                  {...field}
                  data-oid="4p6z43p"
                />
              </FormControl>
              <FormMessage data-oid="lrz2977" />
            </FormItem>
          )}
          data-oid="_r2kdyk"
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem data-oid="8j98109">
              <FormLabel data-oid="574sngx">Şifre</FormLabel>
              <FormControl data-oid="b8l-mgp">
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  data-oid="m1pyynf"
                />
              </FormControl>
              <FormMessage data-oid="7ywwbno" />
            </FormItem>
          )}
          data-oid="jilac-:"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-oid="tg6a6f0"
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-oid="9pr0n3o"
              />
              Giriş yapılıyor...
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm" data-oid="e6v22hq">
        <a href="#" className="text-primary hover:underline" data-oid="3.w3ddx">
          Şifremi unuttum
        </a>
      </div>
    </Form>
  );
}
