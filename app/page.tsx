import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="container relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      data-oid="5.2fbw0"
    >
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        data-oid="i76ijyy"
      >
        <div className="absolute inset-0 bg-zinc-900" data-oid="llocahh">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            width={1920}
            height={1080}
            alt="Authentication"
            className="h-full w-full object-cover opacity-20"
            data-oid="ei4g46t"
          />
        </div>
        <div
          className="relative z-20 flex items-center text-lg font-medium"
          data-oid="g057_x_"
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
            data-oid="qjcux84"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
              data-oid="vv8ytm-"
            />
          </svg>
          Site Yönetim Sistemi
        </div>
        <div className="relative z-20 mt-auto" data-oid="hi04_te">
          <blockquote className="space-y-2" data-oid="mc22-y4">
            <p className="text-lg" data-oid="p4gc_.t">
              "Bu platform sayesinde site yönetimi çok daha kolay ve şeffaf hale
              geldi. Aidatları takip etmek, duyuruları görmek ve yönetimle
              iletişim kurmak artık çok daha basit."
            </p>
            <footer className="text-sm" data-oid="7hofi:v">
              Ahmet Yılmaz - Site Sakini
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8" data-oid="n1ms1ip">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          data-oid="1rxff-v"
        >
          <div
            className="flex flex-col space-y-2 text-center"
            data-oid="n38e4ah"
          >
            <h1
              className="text-2xl font-semibold tracking-tight"
              data-oid="sve0dmw"
            >
              Hoş Geldiniz
            </h1>
            <p className="text-sm text-muted-foreground" data-oid="ijk-i5q">
              Hesabınıza giriş yapın veya yeni bir hesap oluşturun
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full" data-oid="pt3vf7n">
            <TabsList className="grid w-full grid-cols-2" data-oid="y:cjb5h">
              <TabsTrigger value="login" data-oid="6jxp_lb">
                Giriş
              </TabsTrigger>
              <TabsTrigger value="register" data-oid="-92s56g">
                Kayıt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" data-oid="l6_bh6x">
              <LoginForm data-oid="ezn0gnx" />
            </TabsContent>
            <TabsContent value="register" data-oid=".xx.0nu">
              <RegisterForm data-oid="wwu819w" />
            </TabsContent>
          </Tabs>
          <p
            className="px-8 text-center text-sm text-muted-foreground"
            data-oid="zo_i.38"
          >
            Giriş yaparak{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="kzxi9hx"
            >
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
              data-oid="b9m5ndj"
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
