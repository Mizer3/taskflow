import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext, type Theme } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("taskflow-theme", "light");

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
