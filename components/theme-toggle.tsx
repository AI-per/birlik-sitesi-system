"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      data-oid="yqtz3u0"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" data-oid="gv0v6w6" />
      ) : (
        <Moon className="h-5 w-5" data-oid="nh_41xt" />
      )}
    </button>
  );
}
