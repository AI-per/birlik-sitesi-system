"use client";

import { ManagementInfo } from "@/components/contact/management-info";

export default function ContactPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">İletişim</h2>
          <p className="text-muted-foreground">
            Site yönetimi iletişim bilgileri ve acil durum numaraları.
          </p>
        </div>
      </div>

      <div className="w-full">
        <ManagementInfo />
      </div>
    </div>
  );
} 