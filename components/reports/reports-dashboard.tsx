"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

interface ReportsData {
  overview?: {
    totalApartments: number;
    totalResidents: number;
    totalAnnouncements: number;
    totalDues: number;
    totalPayments: number;
    unpaidDues: number;
    thisMonthPayments: number;
    totalDueAmount: number;
    totalPaymentAmount: number;
    unpaidDueAmount: number;
    collectionRate: string;
    recentPayments: Array<{
      id: string;
      amount: number;
      paymentDate: string;
      apartment: string;
      payer: string;
    }>;
  };
  payments?: {
    totalPayments: number;
    totalAmount: number;
    avgPayment: number;
    paymentsByMethod: Record<string, { count: number; amount: number }>;
    paymentsByMonth: Record<string, { count: number; amount: number }>;
    dateRange: { start: string; end: string };
  };
  dues?: {
    total: number;
    paid: number;
    unpaid: number;
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    collectionRate: string;
    duesByBlock: Record<string, any>;
    period: { year?: number; month?: number };
  };
  residents?: {
    totalUsers: number;
    occupiedApartments: number;
    emptyApartments: number;
    occupancyRate: string;
    roleStats: Record<string, number>;
    blockStats: Record<string, number>;
  };
  monthly?: {
    year: number;
    data: Array<{
      month: number;
      monthName: string;
      duesCount: number;
      paymentsCount: number;
      dueAmount: number;
      paymentAmount: number;
      collectionRate: string;
    }>;
  };
}

interface ReportsDashboardProps {
  currentUserRole: string;
}

export function ReportsDashboard({ currentUserRole }: ReportsDashboardProps) {
  const [reportsData, setReportsData] = useState<ReportsData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports?type=overview");
      
      if (response.ok) {
        const data = await response.json();
        setReportsData(data);
      } else {
        throw new Error('Raporlar yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Hata",
        description: "Raporlar yüklenirken bir hata oluştu.",
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const exportReport = async () => {
    try {
      const params = new URLSearchParams({
        type: "overview",
        export: 'true'
      });

      const response = await fetch(`/api/reports?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapor-overview-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
          title: "Başarılı",
          description: "Rapor başarıyla indirildi.",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Rapor indirilemedi.",
        variant: "destructive",
      });
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "text-primary" }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    color?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Raporlar</h2>
          <p className="text-muted-foreground">
            Site yönetimi istatistikleri ve raporları
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchReports} disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.chart className="mr-2 h-4 w-4" />
            )}
            Yenile
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Icons.download className="mr-2 h-4 w-4" />
            İndir
          </Button>
        </div>
      </div>

      {reportsData.overview && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Toplam Daire"
              value={reportsData.overview.totalApartments}
              icon={Icons.building}
              color="text-blue-500"
            />
            <StatCard
              title="Toplam Sakin"
              value={reportsData.overview.totalResidents}
              icon={Icons.users}
              color="text-green-500"
            />
            <StatCard
              title="Toplam Ödeme"
              value={reportsData.overview.totalPayments}
              subtitle={formatCurrency(reportsData.overview.totalPaymentAmount)}
              icon={Icons.dollar}
              color="text-emerald-500"
            />
            <StatCard
              title="Tahsilat Oranı"
              value={`${reportsData.overview.collectionRate}%`}
              subtitle={`${reportsData.overview.unpaidDues} ödeme bekliyor`}
              icon={Icons.chart}
              color="text-purple-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Durumu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Toplam Aidat</span>
                  <span className="font-medium">{formatCurrency(reportsData.overview.totalDueAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tahsil Edilen</span>
                  <span className="font-medium text-green-600">{formatCurrency(reportsData.overview.totalPaymentAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bekleyen</span>
                  <span className="font-medium text-red-600">{formatCurrency(reportsData.overview.unpaidDueAmount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${reportsData.overview.collectionRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {reportsData.overview.totalApartments}
                    </div>
                    <div className="text-sm text-blue-800">Toplam Daire</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {reportsData.overview.totalResidents}
                    </div>
                    <div className="text-sm text-green-800">Kayıtlı Sakin</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {reportsData.overview.totalPayments}
                    </div>
                    <div className="text-sm text-orange-800">Toplam Ödeme</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {reportsData.overview.unpaidDues}
                    </div>
                    <div className="text-sm text-red-800">Bekleyen Aidat</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!reportsData.overview && !isLoading && (
        <div className="text-center p-8">
          <Icons.chart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Henüz rapor verisi yok.</p>
        </div>
      )}
    </div>
  );
} 