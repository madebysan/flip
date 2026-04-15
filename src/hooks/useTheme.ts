import { useState, useEffect } from "react";
import { saveTheme, loadTheme } from "../lib/storage";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    const saved = loadTheme();
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((t) => (t === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
