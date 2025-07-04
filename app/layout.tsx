import type React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Site Yönetim Sistemi",
  description: "Modern site ve apartman yönetim sistemi",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning data-oid="ts0o7kw">
      <body className="" data-oid="es-.f32">
        <Providers>
          <div className="min-h-screen" data-oid="j5:556o">
            {children}
          </div>
          <Toaster data-oid="-mw9gqu" />
        </Providers>
      </body>
    </html>
  );
}
