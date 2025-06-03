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
    <html lang="tr" suppressHydrationWarning data-oid="44ja074">
      <body className="" data-oid="j0y:wcg">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          data-oid="93r90zm"
        >
          <SidebarProvider data-oid="ir-gmy-">
            <div className="min-h-screen" data-oid="ruuatbz">
              {children}
            </div>
            <Toaster data-oid="a_aj662" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
