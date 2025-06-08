import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/sidebar-provider";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          data-oid="e_roh.-"
        >
          <SidebarProvider data-oid="a9gx8wj">
            <div className="min-h-screen" data-oid="j5:556o">
              {children}
            </div>
            <Toaster data-oid="-mw9gqu" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
