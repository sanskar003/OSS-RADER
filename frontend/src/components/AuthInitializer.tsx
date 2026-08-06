"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function AuthInitializer() {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const setLoading = useAuthStore(
    (state) => state.setLoading
  );


  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetch(
          "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/me",
          {
            credentials: "include",
          }
        );


        if (!res.ok) {
          logout();
          return;
        }


        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          logout();
        }

      } catch (error) {
        console.error(
          "Auth initialization failed",
          error
        );

        logout();

      } finally {
        setLoading(false);
      }
    };


    initializeAuth();

  }, [setUser, logout, setLoading]);


  return null;
}