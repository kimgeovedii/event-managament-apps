"use client";

import { useEffect } from "react";
import { useThemeStore } from "../stores/themeStore";

/**
 * ThemeProvider component that initializes the theme on mount.
 * Should be placed at the root of the application.
 */
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
