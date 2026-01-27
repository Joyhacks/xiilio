import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "24twelve-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") {
        return stored;
      }
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    }
    return "dark";
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return { theme, toggleTheme, setTheme };
}
