import { useEffect } from "react";

export function useTheme() {
  // Always use dark mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
  }, []);

  return { theme: "dark" as const };
}
