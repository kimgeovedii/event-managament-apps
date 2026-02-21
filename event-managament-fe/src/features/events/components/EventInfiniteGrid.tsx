"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { useInfiniteEvents } from "../hooks/useInfiniteEvents";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const EventInfiniteGrid: React.FC = () => {
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement>(null);

  const categoryId = searchParams.get("categoryId") || undefined;
  const location = searchParams.get("location") || undefined;
  const search = searchParams.get("search") || undefined;

  const {
    events,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    totalResults,
  } = useInfiniteEvents({
    categoryId,
    location,
    search,
    limit: 12,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-neon-pink font-bold uppercase tracking-widest">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 border-2 border-neon-cyan text-neon-cyan text-xs font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading && events.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(12)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0 && !isLoading) {
    return (
      <div className="py-20 text-center space-y-4">
        <MagnifyingGlassIcon className="size-16 text-gray-700 mx-auto" strokeWidth={1} />
        <p className="text-xl font-bold text-gray-400 uppercase tracking-wider">No Vibes Found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters to find something else.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 transition-colors">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Showing <span className="text-foreground">{events.length}</span> of <span className="text-foreground">{totalResults}</span> Vibes
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {/* Infinite Pagination Skeletons */}
        {isFetchingNextPage && (
          <>
            {[...Array(12)].map((_, i) => (
              <EventCardSkeleton key={`skeleton-next-${i}`} />
            ))}
          </>
        )}
      </div>

      {/* Observer Target / No More Vibes Info */}
      <div 
        ref={observerTarget} 
        className="flex justify-center py-12"
      >
        {!hasNextPage && events.length > 0 && !isLoading && (
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            You've reached the end of the vibe list.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventInfiniteGrid;
