"use client";

import React from "react";
import Image from "next/image";
import type { Event } from "@/data";
import { useEventFavorite } from "../hooks";

// Icons
const CalendarIcon = () => (
  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const colorClasses = {
  pink: {
    badge: "bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black",
    shadow: "hover:shadow-[0_10px_40px_-10px_rgba(238,43,140,0.4)] dark:hover:shadow-[0_10px_40px_-10px_rgba(255,0,255,0.4)]",
  },
  cyan: {
    badge: "bg-[#00bcd4] dark:bg-[#00FFFF] text-white dark:text-black",
    shadow: "hover:shadow-[0_10px_40px_-10px_rgba(0,188,212,0.4)] dark:hover:shadow-[0_10px_40px_-10px_rgba(0,255,255,0.4)]",
  },
  purple: {
    badge: "bg-[#9c27b0] dark:bg-[#B026FF] text-white",
    shadow: "hover:shadow-[0_10px_40px_-10px_rgba(156,39,176,0.4)] dark:hover:shadow-[0_10px_40px_-10px_rgba(176,38,255,0.4)]",
  },
  green: {
    badge: "bg-green-500 dark:bg-green-400 text-white dark:text-black",
    shadow: "hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.4)]",
  },
  lime: {
    badge: "bg-lime-500 dark:bg-[#CCFF00] text-white dark:text-black",
    shadow: "hover:shadow-[0_10px_40px_-10px_rgba(132,204,22,0.4)] dark:hover:shadow-[0_10px_40px_-10px_rgba(204,255,0,0.4)]",
  },
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const colors = colorClasses[event.category.color];
  const { isFavorite, toggleFavorite } = useEventFavorite(event.isFavorite);

  const formatPrice = (price: number, currency: string) => {
    if (event.isFree) return "FREE";
    return `${currency} ${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div
      className={`group relative flex flex-col bg-white dark:bg-[#111] rounded-lg md:rounded-xl overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 ${colors.shadow} transition-all duration-300 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none`}
    >
      {/* Image */}
      <div className="relative h-28 sm:h-36 md:h-48 lg:h-56 overflow-hidden">
        <Image
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-0 dark:grayscale group-hover:grayscale-0"
          src={event.image}
          fill
        />
        {/* Category Badge */}
        <div
          className={`absolute top-2 right-2 md:top-3 md:right-3 z-20 ${colors.badge} px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-black uppercase tracking-wider transform rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] border border-black/20 dark:border-black`}
        >
          {event.category.name}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-grow bg-white dark:bg-[#111]">
        {/* Title */}
        <h3 className="font-display font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 dark:text-white leading-tight group-hover:text-[#00bcd4] dark:group-hover:text-[#00FFFF] transition-colors uppercase mb-1 md:mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Date */}
        <p className="text-[9px] md:text-xs font-bold text-[#9c27b0] dark:text-[#B026FF] uppercase tracking-widest mb-1 md:mb-2 flex items-center gap-1">
          <CalendarIcon />
          <span className="truncate">{event.date} • {event.time}</span>
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[9px] md:text-sm mb-2 md:mb-3 font-mono">
          <span className="text-[#00bcd4] dark:text-[#00FFFF] flex-shrink-0">
            <LocationIcon />
          </span>
          <span className="truncate">
            {event.location.name}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-2 md:pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
          <span
            className={`font-black text-sm md:text-lg ${
              event.isFree ? "text-green-500 dark:text-green-400" : "text-[#00bcd4] dark:text-[#00FFFF]"
            }`}
          >
            {formatPrice(event.price, event.currency)}
          </span>
          <button
            onClick={toggleFavorite}
            className={`p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${
              isFavorite ? "text-[#ee2b8c] dark:text-[#FF00FF]" : "text-gray-400 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF]"
            }`}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
