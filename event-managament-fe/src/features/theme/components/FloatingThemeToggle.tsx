"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/features/theme";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

/**
 * Floating theme toggle button - positioned at bottom-right corner
 * Redesigned with Neon Hype neo-brutalist aesthetics
 */
const FloatingThemeToggle: React.FC = () => {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";
  const isEventsPage = pathname?.startsWith("/events");

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -2, y: -2 }}
      whileTap={{ scale: 0.95, x: 2, y: 2 }}
      onClick={toggleTheme}
      className={`
        fixed bottom-6 right-6 z-50
        ${isEventsPage ? "hidden lg:flex" : "flex"}
        items-center justify-center
        w-14 h-14 rounded-none
        bg-background border-2 border-neon-purple
        shadow-[6px_6px_0_0_rgba(0,0,0,1)]
        dark:shadow-[6px_6px_0_0_rgba(180,74,255,0.2)]
        transition-colors duration-300
        group
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-foreground group-hover:text-neon-pink transition-colors"
        >
          {isDark ? (
            <SunIcon className="size-7" strokeWidth={2.5} />
          ) : (
            <MoonIcon className="size-7" strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default FloatingThemeToggle;
