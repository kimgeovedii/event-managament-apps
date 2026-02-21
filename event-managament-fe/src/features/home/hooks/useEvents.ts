import { useState, useEffect } from "react";
import apiFetch from "@/services/apiFetch";

interface Ticket {
  id: string;
  name: string;
  description?: string;
  location: string;
  price?: number | string;
  startDate: string;
  endDate: string;
  organizerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
    icon?: string | null;
    color?: string | null;
    thumbnail?: string | null;
  };
  organizer: {
    id: string;
    name: string;
  };
  ticketTypes: Array<{
    id: string;
    name: string;
    price: number | string;
    quota?: number;
    description?: string | null;
  }>;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseEventsReturn {
  events: Ticket[];
  meta: Meta | null;
  isLoading: Boolean;
  error: String | null;
  refetch: () => void;
}

interface UseEventsOptions {
  page?: number;
  limit?: number;
  categoryId?: string;
  location?: string;
}

export const useEvents = (
  options: UseEventsOptions | number = 1,
  limit = 6,
): UseEventsReturn => {
  const opts: UseEventsOptions =
    typeof options === "number" ? { page: options, limit } : options;

  const page = opts.page ?? 1;
  const _limit = opts.limit ?? limit;
  const categoryId = opts.categoryId;
  const location = opts.location;

  const [events, setEvents] = useState<Ticket[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(_limit));
      if (categoryId) params.set("categoryId", categoryId);
      if (location) params.set("location", location);

      const response = await apiFetch.get(`/tickets?${params.toString()}`);
      const { data, meta } = response.data;

      const mappedEvents: Ticket[] = (data as Ticket[]).map((ticket) => {
        const prices = (ticket.ticketTypes || []).map((t) =>
          typeof t.price === "string" ? Number(t.price) : Number(t.price || 0),
        );
        const minPrice = prices.length ? Math.min(...prices) : 0;

        return {
          ...ticket,
          price: minPrice,
          startDate: ticket.startDate,
          endDate: ticket.endDate,
        };
      });

      setEvents(mappedEvents);
      setMeta(meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, _limit, categoryId, location]);

  return { events, meta, isLoading, error, refetch: fetchEvents };
};
