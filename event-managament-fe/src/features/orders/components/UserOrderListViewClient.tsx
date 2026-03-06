"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { OrdersResponse } from "../types/orders.types";
import OrderList from "./OrderList";
import { useGetOrders } from "../hooks/useOrders";

interface UserOrderListViewClientProps {
  initialData: OrdersResponse;
}

export default function UserOrderListViewClient({ initialData }: UserOrderListViewClientProps) {
  const router = useRouter();
  const { data, isLoading } = useGetOrders({ limit: 50 }, initialData);

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-8">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 mb-6 md:mb-8 text-gray-500 hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors group"
      >
        <ArrowLeftIcon
          className="size-4 group-hover:-translate-x-1 transition-transform"
          strokeWidth={2.5}
        />
        <span className="font-black uppercase text-xs tracking-widest">
          Return to Home
        </span>
      </button>

      <div className="mb-6 md:mb-8">
        <Typography
          variant="h3"
          className="font-display font-black uppercase tracking-tighter text-black dark:text-white text-2xl md:text-5xl"
        >
          My <span className="text-neon-pink drop-shadow-[0_0_10px_rgba(238,43,140,0.3)]">Vibes</span>
        </Typography>
        <Typography className="!text-gray-500 dark:!text-gray-300 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-1 md:mt-2">
          Your transaction history
        </Typography>
      </div>

      <OrderList 
        orders={data?.data || initialData.data} 
        isLoading={isLoading} 
      />
    </div>
  );
}
