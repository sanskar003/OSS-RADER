"use client"

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  
  const logout = async () => {
    try {
      await fetch(
        "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

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