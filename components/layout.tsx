import type React from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background" data-oid="zfh_pxu">
      <Sidebar data-oid="75:l59:" />
      <div className="flex-1 flex flex-col overflow-hidden" data-oid="cts5v9-">
        <TopNav data-oid="zc4i_.y" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto bg-background"
          data-oid="bwz7_ap"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
