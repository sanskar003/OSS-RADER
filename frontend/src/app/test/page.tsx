import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchGithubUserRepo, sendAccessToken } from "@/services/api";

export default async function TestPage() {
  // Get the NextAuth session
  const session = await getServerSession(authOptions);
  

  // Guard against missing token
  if (!session?.accessToken) {
    return <div>No access token found</div>;
  }

  // Send token to backend using your helper
  const data = await sendAccessToken(session.accessToken);
  const repos = await fetchGithubUserRepo(session.accessToken);


  return (
    <pre className="p-6">
      {JSON.stringify({ session, backendResponse: repos }, null, 2)}
    </pre>
  );
}
