import { useState, useEffect } from "react";
import apiFetch from "@/services/apiFetch";
import type { Event } from "@/data/events";

interface Ticket {
  id: string;
  title: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  organizationId: string;
  categoryId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    status: boolean;
  };
  organization: {
    id: string;
    name: string;
    address: string | null;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseEventsReturn {
  events: Event[];
  meta: Meta | null;
  isLoading: Boolean;
  error: String | null;
  refetch: () => void;
}

const getCategoryColor = (
  categoryName: string,
): "pink" | "cyan" | "purple" | "green" | "lime" => {
  const name = categoryName.toLowerCase();
  if (name.includes("music") || name.includes("concert")) return "pink";
  if (name.includes("workshop") || name.includes("class")) return "cyan";
  if (name.includes("night") || name.includes("party")) return "purple";
  if (name.includes("tech") || name.includes("business")) return "green";
  if (name.includes("art") || name.includes("exhibition")) return "lime";
  return "cyan"; // default
};

const getPlaceholderImage = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  if (name.includes("music"))
    return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60"; // Music
  if (name.includes("tech"))
    return "https://images.unsplash.com/photo-1540575467063-178a50935339?w=800&auto=format&fit=crop&q=60"; // Tech
  if (name.includes("art"))
    return "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60"; // Art
  if (name.includes("workshop"))
    return "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60"; // Workshop
  return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60"; // Generic party
};

export const useEvents = (page = 1, limit = 6): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFetch.get(
        `/tickets?page=${page}&limit=${limit}`,
      );
      const { data, meta } = response.data;

      const mappedEvents: Event[] = (data as Ticket[]).map((ticket) => {
        const startDate = new Date(ticket.startDate);
        return {
          id: ticket.id,
          title: ticket.title,
          slug: ticket.id,
          category: {
            id: ticket.category.id,
            name: ticket.category.name,
            color: getCategoryColor(ticket.category.name),
          },
          date: startDate.toLocaleDateString("id-ID", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          time: startDate.toLocaleTimeString("id-ID", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }),
          location: {
            name: ticket.organization.name,
            city: ticket.organization.address || "Online",
          },
          price: ticket.price,
          currency: "IDR",
          isFree: ticket.price === 0,
          image: getPlaceholderImage(ticket.category.name),
          isFavorite: false,
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
  }, [page, limit]);

  return { events, meta, isLoading, error, refetch: fetchEvents };
};
