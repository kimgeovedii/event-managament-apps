import React from "react";
import { ordersRepository } from "@/features/orders/repositories/orders.repository";
import UserOrderDetailView from "@/features/orders/components/UserOrderDetailView";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Detail | Event Management",
  description: "View your order details and payment status.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserOrderDetailPage({ params }: PageProps) {
  const { id: orderId } = await params;
  return <UserOrderDetailView id={orderId} />;
}
