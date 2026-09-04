import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { Notification} from "@/types/notifications";

export const notificationService = {
  getMine() {
    return apiFetch<Notification[]>(
      "/notifications",
      {
         token: getAccessToken() ?? undefined,
      }
    );
  },

  markAsRead(notificationId: string) {
    return apiFetch(
      `/notifications/${notificationId}/read`,
      {
        method: "PATCH",
         token: getAccessToken() ?? undefined,
      }
    );
  },

  markAllAsRead() {
    return apiFetch<void>(
      "/notifications/read-all",
      {
        method: "PATCH",
      }
    );
  },
};