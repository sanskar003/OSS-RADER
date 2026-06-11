"use client"

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  //ZUSTAND
  const logoutStore = useAuthStore((state) => state.logout)
  
  const logout = async () => {
    try {
      await fetch(
        "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      logoutStore()

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}