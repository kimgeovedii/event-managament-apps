"use client";

import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useEvents } from "../hooks/useEvents";
import PaginationBar from "./PaginationBar";

const EventsGridSection: React.FC = () => {
  // const events = mockEvents.data;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const p = Number(sp.get("page")) || 1;
    setPage(p);
  }, []);

  const { events, meta, isLoading, error } = useEvents(page);

  if (isLoading) {
    return (
      <section className="py-8 md:py-16 px-4 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full text-center">
        <p>Loading events...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 px-4 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {events.map((event: any | any[]) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <PaginationBar totalPages={meta.totalPages} />
      )}
    </section>
  );
};

export default EventsGridSection;
