"use client"

import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useLogout()

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending
        ? "Logging out..."
        : "Logout"}
    </button>
  );
}