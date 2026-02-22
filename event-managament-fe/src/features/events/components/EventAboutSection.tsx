"use client";

import React from "react";
import { Event } from "../types/event.types";
import { CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

interface EventAboutSectionProps {
  event: Event;
}

const EventAboutSection: React.FC<EventAboutSectionProps> = ({ event }) => {
  return (
    <div className="space-y-10 font-display">
      <div className="border-b border-black/5 dark:border-white/10 relative">
        <nav className="flex gap-8 md:gap-12 relative z-10">
          <button className="relative pb-4 text-sm md:text-lg font-black uppercase text-gray-900 dark:text-white tracking-widest group">
            About
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_15px_#00FFDD]"></div>
          </button>
          <button className="pb-4 text-sm md:text-lg font-bold uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all tracking-widest flex items-center gap-2 group">
            Reviews
            <span className="text-[10px] md:text-xs bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full group-hover:bg-neon-cyan/20 group-hover:text-neon-cyan transition-colors">24</span>
          </button>
        </nav>
      </div>
      
      <div className="max-w-none font-body">
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-black/5 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 size-64 bg-neon-purple/5 blur-[80px] rounded-full group-hover:bg-neon-purple/10 transition-all"></div>
          
          <div className="relative z-10 font-medium leading-[1.8] text-base md:text-xl text-gray-700 dark:text-gray-300 tracking-wide">
            {event.description || "No description available for this event."}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-10 relative z-10">
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 md:p-6 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/item">
              <div className="p-3 rounded-xl bg-neon-magenta/10 text-neon-magenta shadow-[0_0_15px_rgba(255,0,85,0.2)] group-hover/item:scale-110 transition-transform">
                <CheckBadgeIcon className="size-6 md:size-8" />
              </div>
              <span className="font-black uppercase text-xs md:text-sm text-gray-900 dark:text-white tracking-widest leading-none">Verified Event Platform</span>
            </div>
            
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 md:p-6 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/item">
              <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,255,221,0.2)] group-hover/item:scale-110 transition-transform">
                <ShieldCheckIcon className="size-6 md:size-8" />
              </div>
              <span className="font-black uppercase text-xs md:text-sm text-gray-900 dark:text-white tracking-widest leading-none">Secure E-Ticketing System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAboutSection;
