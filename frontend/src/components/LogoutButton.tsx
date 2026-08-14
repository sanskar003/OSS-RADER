"use client"

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useLogout()
  const logoutUser = useAuthStore((state) => state.logout)

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();

      logoutUser()
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="bg-rose-400 px-2 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
      onClick={logout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending
        ? "Logging out..."
        : "Logout"}
    </button>
  );
}