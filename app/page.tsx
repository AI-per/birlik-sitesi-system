import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="container relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      data-oid="sqfm82:"
    >
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        data-oid="a4ipfi."
      >
        <div className="absolute inset-0 bg-zinc-900" data-oid="9m36uo8">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            width={1920}
            height={1080}
            alt="Authentication"
            className="h-full w-full object-cover opacity-20"
            data-oid="lal8111"
          />
        </div>
        <div
          className="relative z-20 flex items-center text-lg font-medium"
          data-oid="-vag7cy"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
            data-oid="u2b32py"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
              data-oid="o01k3ys"
            />
          </svg>
          Site Yönetim Sistemi
        </div>
        <div className="relative z-20 mt-auto" data-oid="5:f:2cj">
          <blockquote className="space-y-2" data-oid="o_63gdz">
            <p className="text-lg" data-oid="z:h71bt">
              "Bu platform sayesinde site yönetimi çok daha kolay ve şeffaf hale
              geldi. Aidatları takip etmek, duyuruları görmek ve yönetimle
              iletişim kurmak artık çok daha basit."
            </p>
            <footer className="text-sm" data-oid="l1wc_yl">
              Ahmet Yılmaz - Site Sakini
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8" data-oid="wbrzh16">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          data-oid="9x9l8up"
        >
          <div
            className="flex flex-col space-y-2 text-center"
            data-oid="ey-nz05"
          >
            <h1
              className="text-2xl font-semibold tracking-tight"
              data-oid="3:d9_fk"
            >
              Hoş Geldiniz
            </h1>
            <p className="text-sm text-muted-foreground" data-oid="vvrw8n9">
              Hesabınıza giriş yapın veya yeni bir hesap oluşturun
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full" data-oid="xz4.0k2">
            <TabsList className="grid w-full grid-cols-2" data-oid="_5g-yun">
              <TabsTrigger value="login" data-oid="792hi2o">
                Giriş
              </TabsTrigger>
              <TabsTrigger value="register" data-oid="ny4p8su">
                Kayıt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" data-oid="ywzt57b">
              <LoginForm data-oid="hgtg-ai" />
            </TabsContent>
            <TabsContent value="register" data-oid="qc-u.r6">
              <RegisterForm data-oid="p_5p2_u" />
            </TabsContent>
          </Tabs>
          <p
            className="px-8 text-center text-sm text-muted-foreground"
            data-oid="g1ye1nj"
          >
            Giriş yaparak{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="ql8yrlo"
            >
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="fjbd-xh"
            >
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
}
