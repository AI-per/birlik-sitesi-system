"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the working dashboard settings page
    router.replace("/dashboard/settings");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Yönlendiriliyor...</h2>
        <p className="text-muted-foreground">Ayarlar sayfasına yönlendiriliyorsunuz.</p>
      </div>
    </div>
  );
}
