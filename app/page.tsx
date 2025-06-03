import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="container relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      data-oid="w-r59vo"
    >
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        data-oid="ycih.:_"
      >
        <div className="absolute inset-0 bg-zinc-900" data-oid=":fmfs85">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            width={1920}
            height={1080}
            alt="Authentication"
            className="h-full w-full object-cover opacity-20"
            data-oid="6iun:v0"
          />
        </div>
        <div
          className="relative z-20 flex items-center text-lg font-medium"
          data-oid="kcrz1m4"
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
            data-oid="eo1k6gq"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
              data-oid="c7df1g3"
            />
          </svg>
          Site Yönetim Sistemi
        </div>
        <div className="relative z-20 mt-auto" data-oid="15ulg_8">
          <blockquote className="space-y-2" data-oid="9hy8x_u">
            <p className="text-lg" data-oid="9.n:qje">
              "Bu platform sayesinde site yönetimi çok daha kolay ve şeffaf hale
              geldi. Aidatları takip etmek, duyuruları görmek ve yönetimle
              iletişim kurmak artık çok daha basit."
            </p>
            <footer className="text-sm" data-oid="76:m8zy">
              Ahmet Yılmaz - Site Sakini
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8" data-oid="qe77526">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          data-oid="vxh.ie:"
        >
          <div
            className="flex flex-col space-y-2 text-center"
            data-oid="oko:._2"
          >
            <h1
              className="text-2xl font-semibold tracking-tight"
              data-oid="ayr4.6:"
            >
              Hoş Geldiniz
            </h1>
            <p className="text-sm text-muted-foreground" data-oid=".r5ka.q">
              Hesabınıza giriş yapın veya yeni bir hesap oluşturun
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full" data-oid="vbm..g_">
            <TabsList className="grid w-full grid-cols-2" data-oid="0he2xfp">
              <TabsTrigger value="login" data-oid="riwmfvs">
                Giriş
              </TabsTrigger>
              <TabsTrigger value="register" data-oid=":wwod7f">
                Kayıt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" data-oid="7sud-sa">
              <LoginForm data-oid="3:fsvku" />
            </TabsContent>
            <TabsContent value="register" data-oid="17xj:hy">
              <RegisterForm data-oid="282o2k3" />
            </TabsContent>
          </Tabs>
          <p
            className="px-8 text-center text-sm text-muted-foreground"
            data-oid="obwom15"
          >
            Giriş yaparak{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="a_y868r"
            >
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="xv9qs0i"
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
