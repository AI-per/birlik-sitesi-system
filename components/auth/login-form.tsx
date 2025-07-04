"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
  emailOrPhone: z.string().min(1, {
    message: "E-posta veya telefon numarası giriniz.",
  }).refine((value) => {
    // Check if it's a valid email or phone number
    const isEmail = value.includes('@');
    if (isEmail) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else {
      // Phone number validation (Turkish format)
      return /^(\+90|0)?[5][0-9]{9}$/.test(value.replace(/\s/g, ''));
    }
  }, {
    message: "Geçerli bir e-posta adresi veya telefon numarası giriniz.",
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
      emailOrPhone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        emailOrPhone: values.emailOrPhone,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Giriş başarısız!",
          description: "E-posta/telefon veya şifre hatalı.",
        });
      } else {
        toast({
          title: "Giriş başarılı!",
          description: "Yönlendiriliyorsunuz...",
        });
        router.push("/dashboard");
        router.refresh(); // Refresh to update session
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Giriş başarısız!",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // SECURITY: Prevent any potential GET form submission
  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we never submit via GET method by checking form method
    const formElement = e.currentTarget;
    if (formElement.method && formElement.method.toUpperCase() !== 'POST') {
      console.error('SECURITY: Prevented non-POST form submission');
      return false;
    }
    
    // Use our controlled submit handler
    form.handleSubmit(onSubmit)(e);
    return false;
  };

  return (
    <Form {...form} data-oid="otfzwiy">
      <form
        onSubmit={handleFormSubmission}
        method="POST"
        className="space-y-4"
        data-oid="w9pgk0n"
        noValidate
      >
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem data-oid="5bycslp">
              <FormLabel data-oid="l2u6zls">E-posta veya Telefon</FormLabel>
              <FormControl data-oid="rlgs9qg">
                <Input
                  placeholder="ornek@email.com veya 05XX XXX XX XX"
                  autoComplete="username"
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
                  autoComplete="current-password"
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
