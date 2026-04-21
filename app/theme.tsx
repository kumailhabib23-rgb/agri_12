import React, { createContext, useContext, ReactNode } from "react";

export const theme = {
  primary: "#14532d",
  primaryDark: "#0f3d22",
  primaryLight: "#d1fae5",
  secondary: "#f59e0b", // amber
  accent: "#3b82f6", // blue
  success: "#16a34a",
  error: "#dc2626",
  warning: "#f59e0b",
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
