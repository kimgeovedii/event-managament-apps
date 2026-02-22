"use client";

import React from "react";
import { Event } from "../types/event.types";
import { CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

interface EventAboutSectionProps {
  event: Event;
}

const EventAboutSection: React.FC<EventAboutSectionProps> = ({ event }) => {
  return (
    <div className="space-y-12 font-display">
      <div className="border-b-4 border-black">
        <nav className="flex gap-6 md:gap-12">
          <button className="border-b-2 md:border-b-6 border-neon-cyan pb-2 md:pb-2 text-sm md:text-lg font-black uppercase text-foreground">
            About
          </button>
          <button className="pb-2 md:pb-4 text-sm md:text-lg font-bold uppercase text-gray-500 hover:text-foreground transition-colors">
            Reviews
          </button>
        </nav>
      </div>
      
      <div className="prose prose-lg max-w-none text-foreground font-body">
        <div className="font-medium leading-relaxed text-base md:text-lg text-foreground/80">
          {event.description || "No description available for this event."}
        </div>
        
        <ul className="space-y-4 mt-8 list-none p-0">
          <li className="flex items-center gap-4 brutalist-card p-4">
            <CheckBadgeIcon className="size-8 text-neon-magenta shrink-0" />
            <span className="font-black uppercase text-foreground">Verified Event Platform</span>
          </li>
          <li className="flex items-center gap-4 brutalist-card p-4">
            <ShieldCheckIcon className="size-8 text-neon-cyan shrink-0" />
            <span className="font-black uppercase text-foreground">Secure E-Ticketing System</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventAboutSection;
