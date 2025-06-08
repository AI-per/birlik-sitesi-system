import type React from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background" data-oid="-bbxm4g">
      <Sidebar data-oid="7d9iz4l" />
      <div className="flex-1 flex flex-col overflow-hidden" data-oid="02m:z3w">
        <TopNav data-oid="8wi:io2" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto bg-background"
          data-oid="0gyst08"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
