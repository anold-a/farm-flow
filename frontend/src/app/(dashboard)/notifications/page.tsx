"use client";

import { useMemo, useState } from "react";

import NotificationBadge from "@/components/notifications/NotificationBadge";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationsSkeleton from "@/components/notifications/NotificationsSkeleton";

import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const {
    notifications,
    markAsRead,
    unreadCount,
    loading,
    error,
  } = useNotifications();

  const [filter, setFilter] =
    useState("ALL");

  if (loading) {
    return <NotificationsSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        {error}
      </div>
    );
  }

  

  const filteredNotifications =
    useMemo(() => {
      switch (filter) {
        case "UNREAD":
          return notifications.filter(
            (n) => !n.isRead
          );

        case "FIELD":
        case "WEATHER":
        case "REPORT":
        case "SYSTEM":
          return notifications.filter(
            (n) => n.type === filter
          );

        default:
          return notifications;
      }
    }, [notifications, filter]);

  

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500">
            Stay updated with field activities,
            weather alerts and system events.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <NotificationBadge
            count={unreadCount}
          />

        

        </div>

      </div>

      <NotificationFilters
        filter={filter}
        onChange={setFilter}
      />

      <NotificationList
        notifications={
          filteredNotifications
        }
        onMarkAsRead={
          markAsRead
        }
      />

    </div>
  );
}