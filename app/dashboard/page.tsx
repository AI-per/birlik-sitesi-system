"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { Role } from "@prisma/client";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

interface DashboardData {
  stats: {
    totalBlocks: number;
    totalApartments: number;
    totalUsers: number;
    totalResidents: number;
    totalAnnouncements: number;
    publishedAnnouncements: number;
    totalDues: number;
    paidDues: number;
    unpaidDues: number;
    totalPayments: number;
    thisMonthPayments: number;
    totalDueAmount: number;
    totalPaymentAmount: number;
    unpaidDueAmount: number;
    thisMonthPaymentAmount: number;
    collectionRate: string;
  };
  monthlyChart: Array<{
    name: string;
    total: number;
    collected: number;
    year: number;
    month: number;
  }>;
  duesSummary: Array<{
    month: string;
    collected: number;
    total: number;
    percentage: number;
  }>;
  recentPayments: Array<{
    id: string;
    amount: number;
    paymentDate: string;
    apartment: string;
    payer: string;
    method: string;
  }>;
  recentAnnouncements: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: string;
    authorRole: string;
    isUrgent: boolean;
  }>;
  lastUpdated: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      fetchUserData();
      fetchDashboardData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        throw new Error('Dashboard verileri alınamadı');
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Hata",
        description: "Dashboard verileri yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Icons.spinner className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Yükleniyor...</h2>
          <p className="text-muted-foreground">Dashboard verileri yükleniyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Genel Bakış
        </h2>
      </div>

      {(currentUser?.role === Role.ADMIN || currentUser?.role === Role.MANAGER) && (
        <BulkDueCreator />
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analitik
          </TabsTrigger>
          <TabsTrigger value="reports">
            Raporlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Blok
                </CardTitle>
                <Icons.building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData?.stats.totalBlocks || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Site içindeki toplam blok sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Daire
                </CardTitle>
                <Icons.building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData?.stats.totalApartments || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Kayıtlı toplam daire sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam Kullanıcı
                </CardTitle>
                <Icons.users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData?.stats.totalUsers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData?.stats.totalResidents || 0} sakin kullanıcı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ödenmemiş Aidat
                </CardTitle>
                <Icons.dollar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(dashboardData?.stats.unpaidDueAmount || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData?.stats.unpaidDues || 0} ödenmemiş aidat
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Genel Bakış</CardTitle>
                <CardDescription>Son 6 aylık aidat ve tahsilat durumu</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={dashboardData?.monthlyChart || []} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Son Ödemeler</CardTitle>
                <CardDescription>
                  Son 5 ödeme gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPayments data={dashboardData?.recentPayments || []} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Son Duyurular</CardTitle>
                <CardDescription>
                  Son 5 duyuru gösteriliyor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAnnouncements data={dashboardData?.recentAnnouncements || []} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Aidat Özeti</CardTitle>
                <CardDescription>
                  Son 5 aylık aidat durumu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DuesSummary data={dashboardData?.duesSummary || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Analitik</CardTitle>
                <CardDescription>
                  Detaylı analitik bilgileri burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bu özellik yakında eklenecektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Raporlar</CardTitle>
                <CardDescription>
                  Detaylı raporlar burada görüntülenecek.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
