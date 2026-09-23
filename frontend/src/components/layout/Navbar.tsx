"use client"

import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const {user} = useAuth();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
     <h1 className=" font-display text-3xl text-gray-900">
        Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}
      </h1>


      <UserMenu />
    </header>
  );
}