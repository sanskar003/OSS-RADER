"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";


export default function Dashboard() {

  //ZUSTAND
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/auth/me",
          {
            credentials: "include", // IMPORTANT (cookie auth)
          }
        );

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user");
        }

        setUser(data.user);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchMe();
    } else {
      setLoading(false)
    }
  }, [user, setUser]);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error || !user) {
    return (
      <p className="p-6 text-red-500">
        {error || "User not found"}
      </p>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            className="w-16 h-16 rounded-full"
          />
        )}

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
}