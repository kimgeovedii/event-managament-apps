"use client";

import React from "react";
import Image from "next/image";
import { Event } from "../types/event.types";
import { FireIcon } from "@heroicons/react/24/solid";

interface EventHeroSectionProps {
  event: Event;
}

const EventHeroSection: React.FC<EventHeroSectionProps> = ({ event }) => {
  const imageSrc = event.image || event.imageUrl || "/placeholder.jpg";
  
  return (
    <div className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-black overflow-hidden aspect-video relative group">
      <Image
        alt={event.name}
        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
        src={imageSrc}
        fill
      />
      <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-neon-magenta border-2 md:border-4 border-black px-2 md:px-4 py-1 md:py-2 font-black text-black text-[10px] md:text-sm uppercase flex items-center gap-1 md:gap-2">
        <FireIcon className="size-3 md:size-5" />
        Trending Now
      </div>
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-background border-2 md:border-4 border-black px-2 md:px-4 py-1 md:py-2 text-[10px] md:text-sm font-black uppercase text-foreground">
        Hosted by {event.organizer?.name || "Organizer"}
      </div>
    </div>
  );
};

export default EventHeroSection;
