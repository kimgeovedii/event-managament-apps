"use client";

import React from "react";
import { Event } from "../types/event.types";
import TicketSelectionCard from "./TicketSelectionCard";
import { ShoppingCartIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useBookingSidebar } from "../hooks/useBookingSidebar";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useStoreLogin } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";

interface BookingSidebarProps {
  event: Event;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ event }) => {
  const {
    quantities,
    handleUpdateQuantity,
    selectedTickets,
    total,
  } = useBookingSidebar(event);

  const { isAuthenticated } = useStoreLogin();
  const { addItem, isLoading: cartLoading } = useCartStore();
  const router = useRouter();

  // Snackbar State
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });


  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: "Please log in to add items to cart",
        severity: "error",
      });
      router.push("/login");
      return;
    }

    try {
      // Add all selected tickets to cart
      await Promise.all(
        selectedTickets.map(ticket => addItem(ticket.id, ticket.qty))
      );
      setSnackbar({
        open: true,
        message: "Successfully added to cart!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add to cart. Please try again.",
        severity: "error",
      });
    }
  };


  return (
    <div className="sticky  space-y-8">
      {/* Ticket Selection Area */}
      <div className="brutalist-card overflow-hidden">
        <div className="p-3 bg-black text-white border-b-2 border-black">
          <h3 className="text-lg font-black uppercase tracking-tighter">Select Tickets</h3>
        </div>
        <div className="p-3 space-y-3 max-h-[550px] overflow-y-auto no-scrollbar">
          {(event.ticketTypes || []).map((ticket) => (
            <TicketSelectionCard
              key={ticket.id}
              ticket={ticket}
              quantity={quantities[ticket.id] || 0}
              onIncrease={() => handleUpdateQuantity(ticket.id, 1)}
              onDecrease={() => handleUpdateQuantity(ticket.id, -1)}
            />
          ))}
          {(!event.ticketTypes || event.ticketTypes.length === 0) && (
            <p className="text-gray-500 font-bold uppercase text-center py-4">No tickets available</p>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="brutalist-card p-5 bg-surface border-4">
        <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black pb-2 text-foreground">Order Summary</h3>
        <div className="space-y-2 mb-6">
          {selectedTickets.map(t => (
            <div key={t.id} className="flex justify-between font-bold uppercase text-foreground text-sm">
              <span>{t.qty}x {t.name}</span>
              <span>IDR {(Number(t.price) * t.qty / 1000000).toFixed(2)}M</span>
            </div>
          ))}
          {selectedTickets.length === 0 && (
            <p className="text-gray-500 font-bold uppercase text-sm italic">No tickets selected</p>
          )}
 
          <div className="pt-4 border-t-2 border-black flex justify-between font-black text-2xl tracking-tighter uppercase text-foreground">
            <span>Total</span>
            <span>{(total / 1000000).toFixed(2)}M</span>
          </div>
        </div>
        
        <button 
          disabled={selectedTickets.length === 0 || cartLoading}
          onClick={handleAddToCart}
          className="brutalist-button w-full py-3 text-lg bg-neon-purple text-white neon-glow-purple flex items-center justify-center gap-2 active:bg-neon-magenta disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
        >
          <ShoppingCartIcon className="size-5 text-white" />
          {cartLoading ? "Adding..." : "Add To Cart"}
        </button>
        
        <div className="mt-6 flex items-center justify-center gap-2 opacity-50 font-black text-[10px] uppercase text-foreground">
          <LockClosedIcon className="size-3" />
          Secure via HypePay
        </div>
      </div>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setSnackbar((prev) => ({ ...prev, open: false }));
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 0,
            border: "3px solid black",
            boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
            fontWeight: "900",
            textTransform: "uppercase",
            fontSize: "13px",
            letterSpacing: "0.02em",
            py: 1.5,
            px: 3,
            "&.MuiAlert-filledSuccess": {
              bgcolor: "#00FFDD",
              color: "black",
            },
            "&.MuiAlert-filledError": {
              bgcolor: "#FF0055",
              color: "white",
            },
            "& .MuiAlert-icon": {
              color: snackbar.severity === "success" ? "black" : "white",
              fontSize: "24px",
            },
            "& .MuiAlert-action": {
              pt: 0,
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookingSidebar;
