"use client";

import { useEffect, useState,useCallback } from "react";

import { notificationService } from "@/services/notifications.service";

import {
  Notification,
} from "@/types/notifications";

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


    const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await notificationService.getMine();
      setNotifications(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load notifications.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      const updated = await notificationService.markAsRead(notificationId);

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId ? updated : notification,
        ),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to mark notification as read.");
      }
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead, 
  ).length;


  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    refresh: loadNotifications,
  };
}