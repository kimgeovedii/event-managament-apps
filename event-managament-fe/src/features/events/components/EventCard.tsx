"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../../events/types/event.types";
import { 
  CalendarIcon, 
  MapPinIcon, 
  HeartIcon as HeartIconSolid 
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useEventCard } from "../hooks/useEventCard";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const {
    isFavorite,
    toggleFavorite,
    badgeColor,
    badgeTextColor,
    shadowStyle,
    displayTitle,
    displayDate,
    displayTime,
    displayLocation,
    resolvedPrice,
    currency,
    formatPrice,
    imageSrc,
  } = useEventCard(event);

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-[#111] rounded-lg md:rounded-xl overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[var(--hover-shadow)] transition-all duration-300 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
      style={shadowStyle}
    >
      <Link href={`/events/${event.id}`} className="flex flex-col flex-grow">
        {/* Image */}
        <div className="relative h-28 sm:h-36 md:h-48 lg:h-56 overflow-hidden">
          <Image
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-0 dark:grayscale group-hover:grayscale-0"
            src={imageSrc}
            fill
          />
          {/* Category Badge */}
          <div
            className="absolute top-2 right-2 md:top-3 md:right-3 z-20 px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-black uppercase tracking-wider transform rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#fff] border border-black"
            style={{ 
              backgroundColor: badgeColor,
              color: badgeTextColor
            }}
          >
            {event.category?.name || event.categoryName || "Category"}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-4 flex flex-col flex-grow bg-white dark:bg-[#111]">
          {/* Title */}
          <h3 className="font-display font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 dark:text-white leading-tight group-hover:text-neon-cyan transition-colors uppercase mb-1 md:mb-2 line-clamp-2">
            {displayTitle}
          </h3>

          {/* Date */}
          <p className="text-[9px] md:text-xs font-bold text-neon-purple uppercase tracking-widest mb-1 md:mb-2 flex items-center gap-1">
            <CalendarIcon className="w-3 h-3 md:w-4 md:h-4" />
            <span className="truncate">
              {displayDate} • {displayTime}
            </span>
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[9px] md:text-sm mb-2 md:mb-3 font-mono">
            <span className="text-neon-cyan flex-shrink-0">
              <MapPinIcon className="w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span className="truncate">{displayLocation}</span>
          </div>

          {/* Footer Price */}
          <div className="mt-auto pt-2 md:pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
            <span
              className={`font-black text-sm md:text-lg ${
                event.isFree
                  ? "text-green-400"
                  : "text-neon-cyan"
              }`}
            >
              {formatPrice(resolvedPrice, currency)}
            </span>
          </div>
        </div>
      </Link>

      {/* Favorite Button (Outside Link to avoid nested interactivity) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`absolute bottom-3 right-3 p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20 ${
          isFavorite
            ? "text-neon-magenta"
            : "text-gray-400 hover:text-neon-magenta"
        }`}
      >
        {isFavorite ? (
          <HeartIconSolid className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <HeartIconOutline className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>
    </div>
  );
};

export default EventCard;
