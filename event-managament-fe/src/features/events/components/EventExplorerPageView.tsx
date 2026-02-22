"use client";

import React from "react";
import EventFilters from "./EventFilters";
import EventInfiniteGrid from "./EventInfiniteGrid";
import { 
  AdjustmentsHorizontalIcon, 
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useThemeStore } from "@/features/theme/stores/themeStore";
import { useEventFilters } from "../hooks/useEventFilters";

const EventExplorerPageView: React.FC = () => {
  const filters = useEventFilters();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const { resolvedTheme, toggleTheme } = useThemeStore();

  const actions = [
    { 
      icon: <AdjustmentsHorizontalIcon className="size-6" />, 
      name: 'Filters', 
      onClick: () => setIsFilterOpen(true) 
    },
    { 
      icon: resolvedTheme === 'dark' ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />, 
      name: 'Toggle Theme', 
      onClick: toggleTheme 
    },
  ];

  return (
    <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto bg-background text-foreground transition-colors duration-300 selection:bg-neon-pink selection:text-black min-h-screen">
      {/* Hero Section */}
      <section className="px-5 md:px-8 lg:px-10 pt-8 md:pt-16 pb-6 md:pb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] -z-10 rounded-full md:hidden"></div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-[0.9] uppercase italic py-2">
          EXPLORE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-gray-400 to-neon-pink dark:via-white drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] pr-4 break-words">
            ALL VIBES
          </span>
        </h1>
      </section>

      {/* Explorer Layout */}
      <div className="flex flex-col lg:flex-row px-5 md:px-8 lg:px-10 gap-8 lg:gap-10 pb-20 relative">
        {/* Mobile Filter Overlay */}
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden transition-all duration-300 ${isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsFilterOpen(false)}
        >
          <div 
            className={`absolute right-0 top-0 h-full w-full bg-background border-l-2 border-neon-cyan/30 p-6 overflow-y-auto transition-transform duration-300 transform ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display font-black text-2xl uppercase italic text-neon-cyan">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-none border-2 border-gray-200 dark:border-gray-700">
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <EventFilters {...filters} />
          </div>
        </div>

        {/* Desktop Filter Aside */}
        <div className="hidden lg:block">
          <EventFilters {...filters} />
        </div>

        {/* Grid Content */}
        <div className="flex-1 min-w-0">
          <EventInfiniteGrid {...filters} />
        </div>

        {/* Mobile Page Controls (SpeedDial) - Hidden on Desktop */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <SpeedDial
            ariaLabel="Vibe Controls"
            icon={<SpeedDialIcon icon={<SparklesIcon className="size-6" />} openIcon={<XMarkIcon className="size-6" />} />}
            FabProps={{
              sx: {
                bgcolor: 'var(--neon-cyan)',
                color: 'black',
                boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
                '&:hover': {
                  bgcolor: 'var(--neon-cyan)',
                  opacity: 0.9,
                },
                '& .MuiSvgIcon-root': { fontSize: '1.5rem', fontWeight: 900 }
              }
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={action.onClick}
                FabProps={{
                  sx: {
                    bgcolor: 'var(--surface)',
                    color: 'var(--foreground)',
                    border: '2px solid var(--neon-purple)',
                    '&:hover': {
                      bgcolor: 'var(--neon-purple)',
                      color: 'white',
                    }
                  }
                }}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    </main>
  );
};

export default EventExplorerPageView;
