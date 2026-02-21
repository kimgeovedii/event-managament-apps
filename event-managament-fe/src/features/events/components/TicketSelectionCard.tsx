"use client";

import React from "react";
import { TicketType } from "../types/event.types";

interface TicketSelectionCardProps {
  ticket: TicketType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const TicketSelectionCard: React.FC<TicketSelectionCardProps> = ({ 
  ticket, 
  quantity, 
  onIncrease, 
  onDecrease 
}) => {
  const price = typeof ticket.price === 'string' ? Number(ticket.price) : ticket.price;
  const displayPrice = (price / 1000).toFixed(0);
  const isPopular = ticket.name.toLowerCase().includes("vip");

  return (
    <div className={`border-4 border-black p-4 transition-colors cursor-pointer group relative ${isPopular ? "bg-surface" : "bg-surface"} hover:bg-neon-cyan/10`}>
      {isPopular && (
        <div className="absolute -top-4 -right-4 bg-neon-magenta border-4 border-black px-3 py-1 font-black text-black text-[10px] md:text-xs uppercase -rotate-6 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Popular
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-black uppercase text-foreground leading-tight">{ticket.name}</h4>
          <p className="text-[10px] font-bold uppercase text-gray-500">{ticket.description || "Main Stage Entry"}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-neon-magenta whitespace-nowrap">IDR {displayPrice}k</p>
          {quantity > 0 && (
            <span className="bg-black text-white dark:bg-white dark:text-black text-[9px] font-black px-1.5 py-0.5 uppercase">
              Selected
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center border-t-2 border-black pt-3">
        <span className="text-[10px] font-black uppercase text-gray-400">
          {ticket.quota ? `${ticket.quota} Left` : 'Available'}
        </span>
        <div className="flex items-center border-2 border-black bg-black">
          <button 
            type="button"
            onClick={onDecrease}
            className="px-2 py-0.5 bg-surface text-foreground font-black hover:bg-gray-200 disabled:opacity-50 text-sm"
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="px-3 py-0.5 text-white font-black w-8 text-center text-sm">{quantity}</span>
          <button 
            type="button"
            onClick={onIncrease}
            className="px-2 py-0.5 bg-surface text-foreground font-black hover:bg-neon-cyan text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelectionCard;
