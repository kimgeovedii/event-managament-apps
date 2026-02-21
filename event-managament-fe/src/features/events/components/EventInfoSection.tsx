"use client";

import React from "react";
import { Event } from "../types/event.types";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface EventInfoSectionProps {
  event: Event;
}

const EventInfoSection: React.FC<EventInfoSectionProps> = ({ event }) => {
  const startDate = event.startDate ? new Date(event.startDate) : null;
  
  const displayDate = startDate ? startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase() : "TBA";

  const displayTime = startDate ? startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).toUpperCase() : "TBA";

  const displayLocation = typeof event.location === 'object' ? event.location.name : event.location;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
        {event.name}
      </h1>
      <div className="flex flex-wrap gap-3">
        <div className="bg-neon-cyan border-4 border-black px-4 py-2 flex items-center gap-2 text-black">
          <CalendarIcon className="size-5 stroke-[3px]" />
          <span className="font-black uppercase text-base">{displayDate}</span>
        </div>
        <div className="bg-surface border-4 border-black px-4 py-2 flex items-center gap-2 text-foreground">
          <ClockIcon className="size-5 text-neon-cyan stroke-[3px]" />
          <span className="font-black uppercase text-base">{displayTime}</span>
        </div>
        <div className="bg-surface border-4 border-black px-4 py-2 flex items-center gap-2 text-foreground">
          <MapPinIcon className="size-5 text-neon-magenta stroke-[3px]" />
          <span className="font-black uppercase text-base line-clamp-1">{displayLocation || "Venue TBA"}</span>
        </div>
      </div>
    </div>
  );
};

export default EventInfoSection;
