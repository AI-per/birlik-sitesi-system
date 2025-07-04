"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DuesList } from "@/components/dues/dues-list";
import { Icons } from "@/components/icons";

// Mock user data
const MOCK_CURRENT_USER = {
  id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
  role: "MANAGER"
};

export default function DuesPage() {
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
          <Icons.spinner className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Yükleniyor...</h2>
          <p className="text-muted-foreground">Sayfa yükleniyor.</p>
        </div>
      </div>
    );
  }

  // Block access for RESIDENT and LANDLORD users
  if (currentUser.role === 'RESIDENT' || currentUser.role === 'LANDLORD') {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icons.shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-muted-foreground mb-2">
              Erişim Yetkisi Yok
            </h2>
            <p className="text-muted-foreground mb-4">
              Aidat yönetimine erişim için yönetici yetkisi gereklidir.
            </p>
            <p className="text-sm text-muted-foreground">
              Kişisel aidatlarınızı görüntülemek için Ödemeler sayfasını ziyaret edebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Aidatlar</h2>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold">Aidat Yönetimi</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Site aidatlarını görüntüleyin, düzenleyin ve yönetin. Ödeme durumlarını takip edin ve toplu aidat oluşturun.
          </p>
          <DuesList 
            currentUserId={currentUser.id}
            currentUserRole={currentUser.role}
          />
        </div>
      </div>
    </div>
  );
} 