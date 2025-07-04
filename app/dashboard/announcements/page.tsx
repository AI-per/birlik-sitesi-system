"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnnouncementList } from "@/components/announcements/announcement-list";
import { Icons } from "@/components/icons";

export default function AnnouncementsPage() {
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Duyurular</h2>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <h3 className="text-lg font-semibold">Duyuru Yönetimi</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {currentUser.role === 'RESIDENT' || currentUser.role === 'LANDLORD' 
              ? "Site duyurularını görüntüleyin. Yeni duyuru oluşturma yetkisi sadece yöneticilere aittir."
              : "Site duyurularını görüntüleyin, düzenleyin ve yönetin. Sadece yöneticiler ve site yöneticileri yeni duyuru oluşturabilir."
            }
          </p>
          <AnnouncementList 
            currentUserId={currentUser.id}
            currentUserRole={currentUser.role}
          />
        </div>
      </div>
    </div>
  );
} 