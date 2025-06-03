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
    <html lang="tr" suppressHydrationWarning data-oid="qs4xyje">
      <body className="" data-oid="ft62k_t">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          data-oid="uo-qh8w"
        >
          <SidebarProvider data-oid="gbs1awt">
            <div className="min-h-screen" data-oid="7_os988">
              {children}
            </div>
            <Toaster data-oid="tpmyme4" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
