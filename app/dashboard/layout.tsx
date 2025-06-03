import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" data-oid="czaof:y">
      <Sidebar data-oid="bzjdajh" />
      <div className="flex flex-col flex-1 overflow-hidden" data-oid="kqhseum">
        <Header data-oid="bgwdz89" />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-background"
          data-oid="w68iqf9"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
