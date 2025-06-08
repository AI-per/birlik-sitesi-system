import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/overview";
import { RecentPayments } from "@/components/dashboard/recent-payments";
import { RecentAnnouncements } from "@/components/dashboard/recent-announcements";
import { DuesSummary } from "@/components/dashboard/dues-summary";
import { BulkDueCreator } from "@/components/dashboard/bulk-due-creator";
import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4" data-oid="babr_yf">
      <div className="flex items-center justify-between" data-oid="yf58rwm">
        <h2 className="text-3xl font-bold tracking-tight" data-oid="m7tl0qo">
          Genel Bakış
        </h2>
      </div>

      {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && (
        <BulkDueCreator data-oid="5hnah_6" />
      )}

      <Tabs defaultValue="overview" className="space-y-4" data-oid="zh-ld9a">
        <TabsList data-oid=".uz7670">
          <TabsTrigger value="overview" data-oid="ge:ufrs">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="9763b06">
            Analitik
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="mpypfz4">
            Raporlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="4oj3uit">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            data-oid="vx-mb_."
          >
            <Card data-oid="q1y6tq3">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="bqi7xox"
              >
                <CardTitle className="text-sm font-medium" data-oid="t4n5dwi">
                  Toplam Blok
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                  data-oid="0za983_"
                >
                  <path
                    d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
                    data-oid="3mt272g"
                  />

                  <path
                    d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"
                    data-oid="rt-24c-"
                  />

                  <path d="M12 3v6" data-oid="91a_vd1" />
                </svg>
              </CardHeader>
              <CardContent data-oid="1:_75eo">
                <div className="text-2xl font-bold" data-oid="anoqeut">
                  5
                </div>
                <p className="text-xs text-muted-foreground" data-oid="y92lsmg">
                  +1 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="taco80y">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="f_1pc0o"
              >
                <CardTitle className="text-sm font-medium" data-oid="0hqj56e">
                  Toplam Daire
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                  data-oid=":dwod3n"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    data-oid="n7._qmc"
                  />

                  <circle cx="9" cy="7" r="4" data-oid="wjw94ee" />
                  <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    data-oid="-.7oqh."
                  />
                </svg>
              </CardHeader>
              <CardContent data-oid="83m1-oo">
                <div className="text-2xl font-bold" data-oid="lttah::">
                  120
                </div>
                <p className="text-xs text-muted-foreground" data-oid="ncxiel6">
                  +12 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="o6nbhsk">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="hy_5q0q"
              >
                <CardTitle className="text-sm font-medium" data-oid="s2jvq9r">
                  Toplam Kullanıcı
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                  data-oid="y0ux5d7"
                >
                  <rect
                    width="20"
                    height="14"
                    x="2"
                    y="5"
                    rx="2"
                    data-oid="hnd0pb1"
                  />

                  <path d="M2 10h20" data-oid="wvv8sjx" />
                </svg>
              </CardHeader>
              <CardContent data-oid=".f-0ez6">
                <div className="text-2xl font-bold" data-oid="oyi3p04">
                  145
                </div>
                <p className="text-xs text-muted-foreground" data-oid=".oecpjj">
                  +5 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="f-2pdw6">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="bcx1zg3"
              >
                <CardTitle className="text-sm font-medium" data-oid=":plv-gg">
                  Ödenmemiş Aidat
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                  data-oid="xcvbgoj"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-oid="4mytrzr" />
                </svg>
              </CardHeader>
              <CardContent data-oid="0jkm.my">
                <div className="text-2xl font-bold" data-oid="qez3q01">
                  ₺24,500
                </div>
                <p className="text-xs text-muted-foreground" data-oid="ch4ubtx">
                  -₺2,500 geçen aydan beri
                </p>
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="wl3utlu"
          >
            <Card className="col-span-4" data-oid="09xmeqo">
              <CardHeader data-oid="u93kkz7">
                <CardTitle data-oid="h74f_4u">Genel Bakış</CardTitle>
              </CardHeader>
              <CardContent className="pl-2" data-oid="5m_pj98">
                <Overview data-oid="vfprrwp" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid="p4lx9m4">
              <CardHeader data-oid="eun.2wy">
                <CardTitle data-oid="kd4c7vh">Son Ödemeler</CardTitle>
                <CardDescription data-oid="_uteo14">
                  Son 5 ödeme gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="1ys-m.y">
                <RecentPayments data-oid="f2owo93" />
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="lxncxhm"
          >
            <Card className="col-span-4" data-oid="t5a3x77">
              <CardHeader data-oid="f5tidl.">
                <CardTitle data-oid="86wn31:">Son Duyurular</CardTitle>
                <CardDescription data-oid="fyh4gg6">
                  Son 5 duyuru gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="965zhmq">
                <RecentAnnouncements data-oid="hf93y4p" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid=":df:5lq">
              <CardHeader data-oid="oed:eba">
                <CardTitle data-oid="dx5b6:l">Aidat Özeti</CardTitle>
                <CardDescription data-oid="8w6pdaz">
                  Aylık aidat durumu
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="sn:fdcw">
                <DuesSummary data-oid="klp67z-" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="sqx724f">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="xv7i4qj"
          >
            <Card className="col-span-7" data-oid="no7_ae4">
              <CardHeader data-oid="9e6-ncd">
                <CardTitle data-oid="zonkcu0">Analitik</CardTitle>
                <CardDescription data-oid=".zvcdy8">
                  Detaylı analitik bilgileri burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid=".uv-uus">
                <p className="text-sm text-muted-foreground" data-oid="l.2gwcf">
                  Bu özellik yakında eklenecektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="qte.43t">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="rzz4ilf"
          >
            <Card className="col-span-7" data-oid="anst4_d">
              <CardHeader data-oid="ra3_e7h">
                <CardTitle data-oid=".7ly9ee">Raporlar</CardTitle>
                <CardDescription data-oid=":oc6s_i">
                  Detaylı raporlar burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="shklv_-">
                <p className="text-sm text-muted-foreground" data-oid="9b.js9_">
                  Bu özellik yakında eklenecektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
