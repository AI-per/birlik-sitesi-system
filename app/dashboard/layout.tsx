import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" data-oid="oc:1jvt">
      <Sidebar data-oid="olhi3.y" />
      <div className="flex flex-col flex-1 overflow-hidden" data-oid="b-u_51q">
        <Header data-oid="010-ny8" />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-background"
          data-oid="4lurpf3"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
