import type React from "react";
import { SettingsProvider } from "@/contexts/settings-context";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsProvider data-oid="fvr.kw1">{children}</SettingsProvider>;
}
