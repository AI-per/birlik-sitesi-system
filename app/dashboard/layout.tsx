import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { SettingsProvider } from "@/contexts/settings-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider data-oid="nn0enkd">
      <div className="flex h-screen overflow-hidden" data-oid="gzwu_sx">
        <Sidebar data-oid="_.kva84" />
        <div
          className="flex flex-col flex-1 overflow-hidden"
          data-oid="xo.vlqs"
        >
          <Header data-oid="mxjnaew" />
          <main
            className="flex-1 overflow-y-auto p-4 md:p-6 bg-background"
            data-oid="gwpfc_7"
          >
            {children}
          </main>
        </div>
      </div>
    </SettingsProvider>
  );
}
