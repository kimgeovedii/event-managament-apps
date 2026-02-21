
import apiFetch from "../../../services/apiFetch";
import {UserNotification } from "../types";

export const fetchNotifications = async (): Promise<UserNotification[]> => {
  const response = await apiFetch.get("/notifications");
  return response.data;
};

export const fetchUnreadCount = async (): Promise<number> => {
  const response = await apiFetch.get("/notifications/unread-count");
  return response.data.count;
};

export const markAsRead = async (id: string): Promise<void> => {
  await apiFetch.patch(`/notifications/${id}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await apiFetch.patch("/notifications/read-all");
};
