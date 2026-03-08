import apiFetch from "@/services/apiFetch";
import { Order, OrdersResponse } from "../types/orders.types";

export const ordersRepository = {
  async getOrders(params?: { limit?: number; page?: number; [key: string]: any }, token?: string): Promise<OrdersResponse> {
    const { data } = await apiFetch.get<OrdersResponse>("/orders", {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  },

  async getOrderById(id: string, token?: string): Promise<Order> {
    const { data } = await apiFetch.get<Order>(`/orders/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  },
};
