import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ordersRepository } from "@/features/orders/repositories/orders.repository";
import UserOrderListView from "@/features/orders/components/UserOrderListView";

export const metadata: Metadata = {
  title: "My Vibes | Hype",
  description: "Your transaction history",
};

export default function OrdersPage() {
  return <UserOrderListView />;
}
