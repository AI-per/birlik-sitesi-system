"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface UserSettings {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  currency: string;
  dateFormat: string;
  fontSize: number;
  theme: "light" | "dark" | "system";
  layout: "default" | "compact" | "expanded";
  privacy: {
    analyticsSharing: boolean;
    personalizedAds: boolean;
    visibility: "public" | "private";
    dataRetention: "6-months" | "1-year" | "2-years" | "indefinite";
  };
}

const defaultSettings: UserSettings = {
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38184074.jpg-M4vCjTSSWVw5RwWvvmrxXBcNVU8MBU.jpeg",
  fullName: "Dollar Singh",
  email: "dollar.singh@example.com",
  phone: "+1 (555) 123-4567",
  timezone: "utc-8",
  language: "en",
  currency: "usd",
  dateFormat: "mm-dd-yyyy",
  fontSize: 16,
  theme: "system",
  layout: "default",
  privacy: {
    analyticsSharing: true,
    personalizedAds: false,
    visibility: "public",
    dataRetention: "1-year",
  },
};

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updatePrivacySettings: (settings: Partial<UserSettings["privacy"]>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    // Try to load settings from localStorage during initialization
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("userSettings");
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updatePrivacySettings = (
    privacySettings: Partial<UserSettings["privacy"]>,
  ) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacySettings },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updatePrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
