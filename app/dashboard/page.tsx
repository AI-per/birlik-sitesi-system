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
    <div className="flex flex-col gap-4" data-oid="ovyfeif">
      <div className="flex items-center justify-between" data-oid="upqm7m9">
        <h2 className="text-3xl font-bold tracking-tight" data-oid="5nkgzx4">
          Genel Bakış
        </h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" data-oid="xl71:s2">
        <TabsList data-oid="j9o2own">
          <TabsTrigger value="overview" data-oid="y4y2r2v">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="analytics" data-oid="zz.1t2n">
            Analitik
          </TabsTrigger>
          <TabsTrigger value="reports" data-oid="4-yfsg3">
            Raporlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4" data-oid="_kbwk39">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            data-oid="75tr1n1"
          >
            <Card data-oid="9_1mvct">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="dv5zj:a"
              >
                <CardTitle className="text-sm font-medium" data-oid="215y:81">
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
                  data-oid="szzc_32"
                >
                  <path
                    d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
                    data-oid="c2xgtnn"
                  />

                  <path
                    d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"
                    data-oid="hi2.gwr"
                  />

                  <path d="M12 3v6" data-oid="dwjzxqc" />
                </svg>
              </CardHeader>
              <CardContent data-oid="meul7aw">
                <div className="text-2xl font-bold" data-oid="8lk9c7e">
                  5
                </div>
                <p className="text-xs text-muted-foreground" data-oid="y4.vifn">
                  +1 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid=".1d6l63">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="1nkxexr"
              >
                <CardTitle className="text-sm font-medium" data-oid="wr4mlpl">
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
                  data-oid="mvjjrpw"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    data-oid="z10.9if"
                  />

                  <circle cx="9" cy="7" r="4" data-oid="f81c7as" />
                  <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    data-oid="2q0uf1b"
                  />
                </svg>
              </CardHeader>
              <CardContent data-oid="qbir-gm">
                <div className="text-2xl font-bold" data-oid="b1tt71k">
                  120
                </div>
                <p className="text-xs text-muted-foreground" data-oid="6pmn2ef">
                  +12 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid=".:n7u2t">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="mui53z0"
              >
                <CardTitle className="text-sm font-medium" data-oid="_bycrlm">
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
                  data-oid="28bro._"
                >
                  <rect
                    width="20"
                    height="14"
                    x="2"
                    y="5"
                    rx="2"
                    data-oid="cvpt:8n"
                  />

                  <path d="M2 10h20" data-oid=".817-s." />
                </svg>
              </CardHeader>
              <CardContent data-oid="bzu4upo">
                <div className="text-2xl font-bold" data-oid="c666ak6">
                  145
                </div>
                <p className="text-xs text-muted-foreground" data-oid="w:-q5iq">
                  +5 geçen aydan beri
                </p>
              </CardContent>
            </Card>
            <Card data-oid="d4cbg5f">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                data-oid="bgca.4a"
              >
                <CardTitle className="text-sm font-medium" data-oid="8ldtq-b">
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
                  data-oid="n1s2:ke"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-oid="rid396t" />
                </svg>
              </CardHeader>
              <CardContent data-oid="gl.x7jr">
                <div className="text-2xl font-bold" data-oid=".6kf6oz">
                  ₺24,500
                </div>
                <p className="text-xs text-muted-foreground" data-oid="9ey4vh_">
                  -₺2,500 geçen aydan beri
                </p>
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="va8kayr"
          >
            <Card className="col-span-4" data-oid="9.uysc7">
              <CardHeader data-oid="9evy_4s">
                <CardTitle data-oid="sc18gf5">Genel Bakış</CardTitle>
              </CardHeader>
              <CardContent className="pl-2" data-oid="4xgfmdn">
                <Overview data-oid="amod82f" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid="jpsqj3e">
              <CardHeader data-oid=":tha_uv">
                <CardTitle data-oid="ut9sqef">Son Ödemeler</CardTitle>
                <CardDescription data-oid="74jx4p4">
                  Son 5 ödeme gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="jvj4j_1">
                <RecentPayments data-oid="ymj124:" />
              </CardContent>
            </Card>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="m098zf6"
          >
            <Card className="col-span-4" data-oid="x-l49ca">
              <CardHeader data-oid="hcwmli0">
                <CardTitle data-oid="5nj73jy">Son Duyurular</CardTitle>
                <CardDescription data-oid="wxugiub">
                  Son 5 duyuru gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="i272c7i">
                <RecentAnnouncements data-oid="2nvca6c" />
              </CardContent>
            </Card>
            <Card className="col-span-3" data-oid="lyxdoqx">
              <CardHeader data-oid="dqd.lsd">
                <CardTitle data-oid="5kneczj">Aidat Özeti</CardTitle>
                <CardDescription data-oid="jrpeuv0">
                  Aylık aidat durumu
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="0-_oyr-">
                <DuesSummary data-oid="ewitcs-" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4" data-oid="-2itpd_">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="16_:1.n"
          >
            <Card className="col-span-7" data-oid="xe56a:r">
              <CardHeader data-oid="1rvzcz-">
                <CardTitle data-oid="10bd0qg">Analitik</CardTitle>
                <CardDescription data-oid="03ukszp">
                  Detaylı analitik bilgileri burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="w_:rqi-">
                <p className="text-sm text-muted-foreground" data-oid="jzpgq7.">
                  Bu özellik yakında eklenecektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4" data-oid="a5h.qw:">
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            data-oid="xa9:d5o"
          >
            <Card className="col-span-7" data-oid="c6ldggl">
              <CardHeader data-oid="sv9sjsp">
                <CardTitle data-oid="bu:mf6b">Raporlar</CardTitle>
                <CardDescription data-oid="i:v6ylo">
                  Detaylı raporlar burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent data-oid="42nbz3o">
                <p className="text-sm text-muted-foreground" data-oid=".u73ix9">
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
