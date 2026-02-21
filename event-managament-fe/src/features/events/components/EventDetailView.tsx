"use client";

import React from "react";
import { useEventDetail } from "../hooks/useEventDetail";
import EventHeroSection from "./EventHeroSection";
import EventInfoSection from "./EventInfoSection";
import EventAboutSection from "./EventAboutSection";
import BookingSidebar from "./BookingSidebar";
import EventDetailSkeleton from "./EventDetailSkeleton";
import { StarIcon, UserIcon } from "@heroicons/react/24/solid";

interface EventDetailViewProps {
  eventId: string;
}

const EventDetailView: React.FC<EventDetailViewProps> = ({ eventId }) => {
  const { event, isLoading, error } = useEventDetail(eventId);

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center flex-col gap-8">
        <div className="text-4xl font-black uppercase text-neon-magenta text-center">
          {error || "Event Not Found"}
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="brutalist-button px-8 py-4 bg-white text-black text-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="pt-6 pb-16 px-4 lg:px-8 max-w-7xl mx-auto overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* Hero Image */}
          <EventHeroSection event={event} />
          
          {/* Event Basic Info */}
          <EventInfoSection event={event} />
          
          {/* Tabs and About */}
          <EventAboutSection event={event} />

          {/* Organizer & Reviews Placeholder */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="brutalist-card p-8">
              <h3 className="text-2xl font-black uppercase mb-6 text-neon-purple">Organizer</h3>
              <div className="flex items-center gap-4">
                <div className="size-16 border-4 border-black bg-neon-purple flex items-center justify-center">
                  <span className="font-black text-lg text-white">
                    {event.organizer?.name?.substring(0, 4).toUpperCase() || "NEON"}
                  </span>
                </div>
                <div>
                   <h4 className="text-xl font-black uppercase text-foreground">
                     {event.organizer?.name || "Organizer Name"}
                   </h4>
                   <p className="text-sm font-bold uppercase text-gray-500">Verified Partner • 4.8 Rating</p>
                 </div>
              </div>
            </div>
            
            <div className="brutalist-card p-8 !bg-neon-cyan text-black">
              <h3 className="text-2xl font-black uppercase mb-6 flex justify-between">
                Reviews
                <span className="flex items-center gap-1">
                  <StarIcon className="size-5 text-black" /> 4.9
                </span>
              </h3>
              <div className="flex gap-4">
                <div className="size-12 border-4 border-black bg-black shrink-0 flex items-center justify-center">
                    <UserIcon className="size-6 text-white" />
                </div>
                <p className="text-sm font-black uppercase leading-tight italic">
                  "Absolutely insane experience! The vibes were unmatched."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Sticky */}
        <div className="lg:col-span-4">
          <BookingSidebar event={event} />
        </div>
      </div>
    </main>
  );
};

export default EventDetailView;
