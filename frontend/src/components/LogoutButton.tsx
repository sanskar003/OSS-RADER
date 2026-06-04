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
        "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      logoutStore()

      router.push("/");
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