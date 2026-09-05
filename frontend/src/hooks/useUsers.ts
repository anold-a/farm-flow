"use client";

import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User, CreateUserDto } from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load users.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const createUser = async (data: CreateUserDto) => {
    const newUser = await userService.create(data);
    setUsers((current) => [...current, newUser]);
    return newUser;
  };

  return {
    users,
    loading,
    error,
    createUser,
    refresh: loadUsers,
  };
}