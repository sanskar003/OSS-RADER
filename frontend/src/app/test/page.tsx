// "use client"
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { fetchGithubTopLanguage, fetchGithubUserRepo, sendAccessToken } from "@/services/api";

import LoginButton from "@/components/LoginButton";

// export default async function TestPage() {
//   // Get the NextAuth session
//   const session = await getServerSession(authOptions);
  

//   // Guard against missing token
//   if (!session?.accessToken) {
//     return <div>No access token found</div>;
//   }

//   // Send token to backend using your helper
//   const data = await sendAccessToken(session.accessToken);
//   const repos = await fetchGithubUserRepo(session.accessToken);
//   const toplanguages = await fetchGithubTopLanguage(session.accessToken);


//   return (
//     <pre className="p-6">
//       {JSON.stringify({ session, backendResponse: toplanguages }, null, 2)}
//     </pre>
//   );
// }


export default async function TestPage() {
  return (
    <div>
      <LoginButton/>
    </div>
  );
}