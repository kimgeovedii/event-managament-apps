import React from "react";
import { cookies } from "next/headers";
import { ordersService } from "../services/orders.service";
import UserOrderDetailViewClient from "./UserOrderDetailViewClient";

interface UserOrderDetailViewProps {
  id: string;
}

export default async function UserOrderDetailView({ id }: UserOrderDetailViewProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const order = await ordersService.getOrderById(id, token);

    if (!order) {
      return (
        <div className="flex justify-center p-12">
          <div className="font-display font-black uppercase text-xl animate-pulse text-neon-pink">
            Vibe not found...
          </div>
        </div>
      );
    }

    return <UserOrderDetailViewClient initialOrder={order} />;
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="p-6 border-4 border-neon-magenta bg-neon-magenta/10 text-neon-magenta font-black uppercase text-center mb-6 shadow-[8px_8px_0_0_#000]">
          Failed to load order. The vibe might be missing or you're uninvited.
        </div>
      </div>
    );
  }
}
