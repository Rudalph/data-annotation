"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Logged in as: {user?.email}</p>
    </div>
  );
}