"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Vibrant Blue
    },
    secondary: {
      main: "#7c3aed", // Vibrant Purple
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Inter, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
