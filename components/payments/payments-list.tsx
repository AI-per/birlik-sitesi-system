"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";

interface Payment {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string | null;
  receiptNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  due: {
    id: string;
    amount: number;
    month: number;
    year: number;
    dueDate: string;
    description: string | null;
    apartment: {
      id: string;
      number: string;
      floor: number;
      block: {
        id: string;
        name: string;
      };
    };
  };
  payer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };
}

export function PaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/users/profile');
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser({ id: userData.id, role: userData.role });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [selectedYear, selectedMonth, selectedMethod, dateRange]);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedYear !== "all" && selectedMonth !== "all") {
        params.append('year', selectedYear);
        params.append('month', selectedMonth);
      }
      
      if (dateRange.start && dateRange.end) {
        params.append('startDate', dateRange.start);
        params.append('endDate', dateRange.end);
      }

      const response = await fetch(`/api/payments?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const getMonthName = (month: number) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return months[month - 1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const getPaymentMethodBadge = (method: string | null) => {
    if (!method) return <span className="text-muted-foreground">-</span>;
    
    const methodColors: Record<string, string> = {
      'Nakit': 'bg-green-100 text-green-800',
      'Banka Havalesi': 'bg-blue-100 text-blue-800',
      'Kredi Kartı': 'bg-purple-100 text-purple-800',
      'EFT': 'bg-orange-100 text-orange-800',
    };

    return (
      <Badge className={methodColors[method] || 'bg-gray-100 text-gray-800'}>
        {method}
      </Badge>
    );
  };

  // Get unique years and payment methods from payments
  const uniqueYears = Array.from(new Set(payments.map(p => p.due.year))).sort((a, b) => b - a);
  const uniqueMethods = Array.from(new Set(payments.map(p => p.paymentMethod).filter(Boolean)));

  // Filter payments based on selected method
  const filteredPayments = selectedMethod === "all" 
    ? payments 
    : payments.filter(p => p.paymentMethod === selectedMethod);

  // Calculate statistics
  const totalPayments = filteredPayments.length;
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const avgPayment = totalPayments > 0 ? totalAmount / totalPayments : 0;

  // DataTable columns configuration
  const columns = [
    {
      id: "paymentDate",
      accessorKey: "paymentDate" as keyof Payment,
      header: "Ödeme Tarihi",
      sortable: true,
      sortType: "date" as const,
      searchable: false,
      cell: (value: any, payment: Payment) => (
        <div className="flex flex-col">
          <span className="font-medium">{formatDate(payment.paymentDate)}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(payment.paymentDate).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      )
    },
    {
      id: "apartment",
      accessorFn: (payment: Payment) => `${payment.due.apartment.block.name} - ${payment.due.apartment.number}`,
      header: "Daire",
      sortable: true,
      sortType: "text" as const,
      searchable: true,
      cell: (value: any, payment: Payment) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {payment.due.apartment.block.name} - {payment.due.apartment.number}
          </span>
          <span className="text-xs text-muted-foreground">
            {payment.due.apartment.floor}. Kat
          </span>
        </div>
      )
    },
    {
      id: "payer",
      accessorKey: "payer" as keyof Payment,
      header: "Ödeyen",
      sortable: true,
      sortType: "text" as const,
      searchable: true,
      cell: (value: any, payment: Payment) => (
        <div className="flex flex-col">
          <span className="font-medium">{payment.payer.fullName}</span>
          <span className="text-xs text-muted-foreground">
            {payment.payer.phone}
          </span>
        </div>
      )
    },
    {
      id: "period",
      accessorFn: (payment: Payment) => `${payment.due.year}-${payment.due.month.toString().padStart(2, '0')}`,
      header: "Dönem",
      sortable: true,
      sortType: "text" as const,
      searchable: false,
      cell: (value: any, payment: Payment) => (
        <div className="flex flex-col">
          <span>{getMonthName(payment.due.month)} {payment.due.year}</span>
          {payment.due.description && (
            <span className="text-xs text-muted-foreground">
              {payment.due.description}
            </span>
          )}
        </div>
      )
    },
    {
      id: "amount",
      accessorKey: "amount" as keyof Payment,
      header: "Tutar",
      sortable: true,
      sortType: "number" as const,
      searchable: false,
      cell: (value: any, payment: Payment) => (
        <div className="flex flex-col">
          <span className="font-bold text-green-600">
            {formatCurrency(payment.amount)}
          </span>
          {payment.amount !== payment.due.amount && (
            <span className="text-xs text-muted-foreground">
              Aidat: {formatCurrency(payment.due.amount)}
            </span>
          )}
        </div>
      )
    },
    {
      id: "paymentMethod",
      accessorKey: "paymentMethod" as keyof Payment,
      header: "Yöntem",
      sortable: true,
      sortType: "text" as const,
      searchable: true,
      cell: (value: any, payment: Payment) => getPaymentMethodBadge(payment.paymentMethod)
    },
    {
      id: "receiptNumber",
      accessorKey: "receiptNumber" as keyof Payment,
      header: "Fiş No",
      sortable: true,
      sortType: "text" as const,
      searchable: true,
      cell: (value: any, payment: Payment) => (
        payment.receiptNumber ? (
          <span className="font-mono text-sm">{payment.receiptNumber}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      )
    }
  ];

  // Top actions for filtering
  const topActions = (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="year-filter" className="text-sm font-medium whitespace-nowrap">
          Yıl:
        </Label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-24" id="year-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="month-filter" className="text-sm font-medium whitespace-nowrap">
          Ay:
        </Label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-32" id="month-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Aylar</SelectItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <SelectItem key={month} value={month.toString()}>
                {getMonthName(month)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="method-filter" className="text-sm font-medium whitespace-nowrap">
          Yöntem:
        </Label>
        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-40" id="method-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Yöntemler</SelectItem>
            {uniqueMethods.map((method) => (
              <SelectItem key={method} value={method!}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium whitespace-nowrap">
          Tarih Aralığı:
        </Label>
        <Input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          className="w-36"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          className="w-36"
        />
        {(dateRange.start || dateRange.end) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange({ start: "", end: "" })}
          >
            Temizle
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ödeme</CardTitle>
            <Icons.dollar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(totalAmount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Ödeme</CardTitle>
            <Icons.chart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgPayment)}</div>
            <p className="text-xs text-muted-foreground">
              Ödeme başına ortalama
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay</CardTitle>
            <Icons.calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredPayments.filter(p => {
                const paymentDate = new Date(p.paymentDate);
                const now = new Date();
                return paymentDate.getMonth() === now.getMonth() && 
                       paymentDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ayki ödemeler
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredPayments}
        columns={columns}
        searchPlaceholder="Ödeme ara (daire, ödeyen, yöntem)..."
        emptyMessage="Henüz ödeme kaydı bulunmuyor."
        loadingMessage="Ödemeler yükleniyor..."
        isLoading={isLoading}
        topActions={topActions}
        onRowClick={(payment) => {
          if (currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER') {
            router.push(`/dashboard/payments/${payment.id}`);
          }
        }}
        rowClickCondition={(payment: Payment) => 
          currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER'
        }
      />
    </div>
  );
} 