import { syncGithubUser } from "@/services/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      syncGithubUser(session.accessToken, session.user)
        .then(() => console.log("User synced with backend"))
        .catch((err) => console.error("Sync failed", err));
    }
        console.log("Session object:", session);

  }, [session]);

  return null
}
