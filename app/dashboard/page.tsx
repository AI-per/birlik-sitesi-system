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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4" data-oid="7rnf.tx">
      <div className="flex items-center justify-between" data-oid="i6zphhw">
        <h2 className="text-3xl font-bold tracking-tight" data-oid="ewj:8jd">
          Genel Bakış
        </h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" data-oid="ly98nlb">
        <TabsList data-oid="2afz773">
          <TabsTrigger value="overview" data-oid=":1kvmfy">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="-dr-8yv">
            Analitik
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="yn4zgtq">
            Raporlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="h2y:z9:">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            data-oid="f0.-zk4"
          >
            <Card data-oid="gj4upnt">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="q.4tp7o"
              >
                <CardTitle className="text-sm font-medium" data-oid="uixmmfr">
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
                  data-oid="wml227j"
                >
                  <path
                    d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
                    data-oid="qj_t75w"
                  />

                  <path
                    d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"
                    data-oid="3_l56nz"
                  />

                  <path d="M12 3v6" data-oid="n5m02e4" />
                </svg>
              </CardHeader>
              <CardContent data-oid="8038nw0">
                <div className="text-2xl font-bold" data-oid="cqz1_6u">
                  5
                </div>
                <p className="text-xs text-muted-foreground" data-oid="kpqkh0u">
                  +1 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="xqx94e.">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="l5raquq"
              >
                <CardTitle className="text-sm font-medium" data-oid="zaz_yto">
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
                  data-oid="exwb6qt"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    data-oid="ew.4g3u"
                  />

                  <circle cx="9" cy="7" r="4" data-oid=".x88-zx" />
                  <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    data-oid="gx6e.xx"
                  />
                </svg>
              </CardHeader>
              <CardContent data-oid="3:9q_h9">
                <div className="text-2xl font-bold" data-oid="2ga7oot">
                  120
                </div>
                <p className="text-xs text-muted-foreground" data-oid="p84a-li">
                  +12 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="jlbdru0">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="swkuchd"
              >
                <CardTitle className="text-sm font-medium" data-oid="qxgtdgp">
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
                  data-oid="2k39bm_"
                >
                  <rect
                    width="20"
                    height="14"
                    x="2"
                    y="5"
                    rx="2"
                    data-oid="5wre.xy"
                  />

                  <path d="M2 10h20" data-oid="et14u7s" />
                </svg>
              </CardHeader>
              <CardContent data-oid="e32u3vm">
                <div className="text-2xl font-bold" data-oid="8qecfgh">
                  145
                </div>
                <p className="text-xs text-muted-foreground" data-oid="e8_4q0n">
                  +5 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="55a2uca">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="ejfr1r6"
              >
                <CardTitle className="text-sm font-medium" data-oid="omo6fun">
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
                  data-oid="ktw98ua"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-oid="4tv5.9i" />
                </svg>
              </CardHeader>
              <CardContent data-oid="0w8rt.l">
                <div className="text-2xl font-bold" data-oid="51ve2e6">
                  ₺24,500
                </div>
                <p className="text-xs text-muted-foreground" data-oid="5umxfqh">
                  -₺2,500 geçen aydan beri
                </p>
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="g7o.d7p"
          >
            <Card className="col-span-4" data-oid="x7kmjeg">
              <CardHeader data-oid="5.qg.qx">
                <CardTitle data-oid="fk4vp:4">Genel Bakış</CardTitle>
              </CardHeader>
              <CardContent className="pl-2" data-oid=":e_5xn7">
                <Overview data-oid="ur-_3d:" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid="hnn9ywq">
              <CardHeader data-oid="fswnap6">
                <CardTitle data-oid="8h84:4c">Son Ödemeler</CardTitle>
                <CardDescription data-oid="mds-7lq">
                  Son 5 ödeme gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="rcvyitu">
                <RecentPayments data-oid="whi3kp4" />
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="qqi3f02"
          >
            <Card className="col-span-4" data-oid="4i9r3u4">
              <CardHeader data-oid="6s85b-d">
                <CardTitle data-oid="szvcrc:">Son Duyurular</CardTitle>
                <CardDescription data-oid="7yh8k48">
                  Son 5 duyuru gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="t6kgen6">
                <RecentAnnouncements data-oid="4wy2xef" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid="hb2597.">
              <CardHeader data-oid="ksxxvsp">
                <CardTitle data-oid="w4d19p.">Aidat Özeti</CardTitle>
                <CardDescription data-oid="tlt4g1.">
                  Aylık aidat durumu
                </CardDescription>
              </CardHeader>
              <CardContent data-oid=".uwsojz">
                <DuesSummary data-oid="p00et_r" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="wujp49w">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="2xz6yas"
          >
            <Card className="col-span-7" data-oid="c:.3g4s">
              <CardHeader data-oid="o1--4o:">
                <CardTitle data-oid="kl0g31v">Analitik</CardTitle>
                <CardDescription data-oid="8um0-6r">
                  Detaylı analitik bilgileri burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="44.c_m4">
                <p className="text-sm text-muted-foreground" data-oid="heahy_l">
                  Bu özellik yakında eklenecektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="wnstr9x">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="3tvl7gm"
          >
            <Card className="col-span-7" data-oid="_f3xnc7">
              <CardHeader data-oid="vw9vmcn">
                <CardTitle data-oid="i.:2w33">Raporlar</CardTitle>
                <CardDescription data-oid="z-f-2fw">
                  Detaylı raporlar burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="z0una3n">
                <p className="text-sm text-muted-foreground" data-oid="jndd:n4">
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
