"use client";

import React from "react";
import EventCard from "./EventCard";
import { mockEvents } from "@/data";

const EventsGridSection: React.FC = () => {
  const events = mockEvents.data;

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventsGridSection;
