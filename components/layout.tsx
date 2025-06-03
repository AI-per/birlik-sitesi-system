import type React from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background" data-oid="lc779o5">
      <Sidebar data-oid="kqg2tsf" />
      <div className="flex-1 flex flex-col overflow-hidden" data-oid="u79rxdy">
        <TopNav data-oid=":1ojdx0" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto bg-background"
          data-oid="iedjume"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
