"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReportsDashboard } from "@/components/reports/reports-dashboard";

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    // Fetch current user data
    const fetchUser = async () => {
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

    fetchUser();
  }, [session, status, router]);

  if (status === "loading" || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Yükleniyor...</h2>
          <p className="text-muted-foreground">Sayfa yükleniyor.</p>
        </div>
      </div>
    );
  }

  // Only admins and managers can access reports
  if (currentUser.role !== 'ADMIN' && currentUser.role !== 'MANAGER') {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-muted-foreground mb-2">
              Erişim Yetkisi Yok
            </h2>
            <p className="text-muted-foreground">
              Raporlara erişim için yönetici yetkisi gereklidir.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Raporlar</h2>
          <p className="text-muted-foreground">
            Site yönetimi istatistikleri ve raporları
          </p>
        </div>
      </div>

      <ReportsDashboard currentUserRole={currentUser.role} />
    </div>
  );
} 