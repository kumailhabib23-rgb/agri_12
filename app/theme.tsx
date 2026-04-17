import React, { createContext, useContext, ReactNode } from "react";

export const theme = {
  primary: "#14532d",
  primaryDark: "#14532d",
  primaryLight: "#d1fae5",
  success: "#16a34a",
  error: "#dc2626",
  background: "#F4F6F8",
  surface: "#ffffff",
  surfaceSoft: "#14532d",
  surfaceMuted: "#eef7ee",
  text: "#111827",
  textMuted: "#6b7280",
  textOnPrimary: "#ffffff",
  border: "#e5e7eb",
  shadow: "rgba(22,163,74,0.16)",
};

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
