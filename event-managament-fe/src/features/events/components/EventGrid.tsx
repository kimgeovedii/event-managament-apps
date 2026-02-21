"use client";

import React from "react";
import EventExplorerCard from "./EventExplorerCard";
import { Event } from "../types/event.types";

interface EventGridProps {
  events: Event[];
  totalResults: number;
}

const EventGrid: React.FC<EventGridProps> = ({ events, totalResults }) => {
  return (
    <section className="flex-1 space-y-10">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 transition-colors">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Showing <span className="text-foreground">{totalResults}</span> Results
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Sort by:</span>
          <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-neon-cyan focus:ring-0 cursor-pointer">
            <option className="bg-background dark:bg-surface-dark">Newest</option>
            <option className="bg-background dark:bg-surface-dark">Popular</option>
            <option className="bg-background dark:bg-surface-dark">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventExplorerCard key={event.id} event={event} />
        ))}
      </div>

      {events.length < totalResults && (
        <div className="flex justify-center pt-12">
          <button className="px-12 py-5 border-4 border-neon-pink text-neon-pink font-display font-black text-2xl uppercase tracking-tighter hover:bg-neon-pink hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(255,0,255,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,0,255,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            Load More Vibes
          </button>
        </div>
      )}
    </section>
  );
};

export default EventGrid;
