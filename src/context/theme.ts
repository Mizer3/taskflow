import { createContext, useContext } from "react";

export type Theme = "light" | "dark";
export type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme doit être utilisé à l'intérieur de <ThemeProvider>");
  }
  return context;
}
