"use client";

import { ProfileSettings } from "@/components/settings/profile-settings";

export default function DashboardSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ayarlar</h2>
          <p className="text-muted-foreground">
            Profil bilgilerinizi yönetin ve hesap ayarlarınızı düzenleyin.
          </p>
        </div>
      </div>

      <ProfileSettings />
    </div>
  );
} 