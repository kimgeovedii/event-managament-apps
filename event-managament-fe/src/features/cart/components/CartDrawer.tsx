"use client";

import React, { useEffect } from "react";
import { Drawer, IconButton, Typography, Divider, Box, Button } from "@mui/material";
import { XMarkIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../store/useCartStore";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, fetchCart, updateItemQuantity, removeItem, isLoading } = useCartStore();

  useEffect(() => {
    if (open) {
      fetchCart();
    }
  }, [open, fetchCart]);

  const total = cart?.items.reduce((acc, item) => {
    return acc + (Number(item.ticketType.price) * item.quantity);
  }, 0) || 0;

  const sortedItems = cart?.items ? [...cart.items].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) : [];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          bgcolor: "background.default",
          borderLeft: "4px solid black",
          boxShadow: "-10px 0px 30px rgba(0,0,0,0.1)",
          "&.dark": {
            borderLeft: "4px solid #00FFFF",
          }
        }
      }}
    >
      <Box className="flex flex-col h-full bg-white dark:bg-black p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-neon-cyan border-4 border-black dark:border-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <ShoppingCartIcon className="size-6 text-black" />
            </div>
            <Typography className="font-display font-black uppercase text-2xl tracking-tighter text-black dark:text-white">
              Your Cart
            </Typography>
          </div>
          <IconButton onClick={onClose} className="border-2 border-black dark:border-white rounded-none hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-black dark:text-white">
            <XMarkIcon className="size-6" />
          </IconButton>
        </div>

        <Divider className="border-2 border-black dark:border-gray-800 mb-6" />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {sortedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400 font-bold uppercase italic">
              <p>Your cart is empty</p>
              <Button onClick={onClose} className="mt-4 text-neon-purple dark:text-neon-cyan font-black underline">
                Browse Events
              </Button>
            </div>
          ) : (
            sortedItems.map((item) => (
              <div key={item.id} className="border-4 border-black dark:border-white/20 p-3 bg-surface dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex gap-4 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]">
                <div className="relative size-20 border-2 border-black dark:border-white/40 flex-shrink-0">
                  <img
                    src={item.ticketType.event.imageUrl || "/placeholder.jpg"}
                    alt={item.ticketType.event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography className="font-display font-black uppercase text-sm truncate text-black dark:text-white">
                    {item.ticketType.event.name}
                  </Typography>
                  <Typography className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    {item.ticketType.name}
                  </Typography>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border-2 border-black dark:border-white/40">
                      <button
                        onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-white/10 font-black text-black dark:text-white"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 border-x-2 border-black dark:border-white/40 font-black text-xs text-black dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-white/10 font-black text-black dark:text-white"
                      >
                        +
                      </button>
                    </div>
                    <IconButton onClick={() => removeItem(item.id)} size="small" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                      <TrashIcon className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="mt-8 pt-6 border-t-4 border-black dark:border-gray-800 border-dashed">
            <div className="flex justify-between items-end mb-6">
              <Typography className="font-display font-black uppercase text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </Typography>
              <Typography className="font-display font-black text-3xl tracking-tighter uppercase text-black dark:text-white">
                IDR {(total / 1000000).toFixed(2)}M
              </Typography>
            </div>
            <Button
              className="brutalist-button w-full py-4 bg-neon-purple text-white font-black text-lg neon-glow-purple active:bg-neon-magenta"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
