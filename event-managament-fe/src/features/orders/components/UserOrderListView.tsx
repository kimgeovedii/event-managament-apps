import React from "react";
import { cookies } from "next/headers";
import { ordersService } from "../services/orders.service";
import UserOrderListViewClient from "./UserOrderListViewClient";

export default async function UserOrderListView() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const initialData = await ordersService.getOrders({ limit: 50 }, token);
    return <UserOrderListViewClient initialData={initialData} />;
  } catch (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="p-6 border-4 border-neon-magenta bg-neon-magenta/10 text-neon-magenta font-black uppercase text-center mb-6 shadow-[8px_8px_0_0_#000]">
          Failed to load vibes. The transaction history is currently offline.
        </div>
      </div>
    );
  }
}
