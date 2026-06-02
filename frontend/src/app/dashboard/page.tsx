"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          "https://glorious-space-engine-g4r7p5xvwwv52p79w-5000.app.github.dev/api/auth/me",
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

    fetchMe();
  }, []);

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