import type { Session } from "next-auth"

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`http://localhost:5000/api/project${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Api request failed");
  }

  return response.json();
}

// export async function apiAuthFetch(path: string, options: RequestInit = {}) {
//   try {
//     const response = await fetch(`http://localhost:5000/api/auth${path}`, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(options?.headers || {}),
//       },
//       next: { revalidate: 60 },
//     });

//     if (!response.ok) {
//       let errorMessage = "Auth request failed";

//       try {
//         const errorBody = await response.json();
//         if (typeof errorBody?.message === "string" && errorBody.message.trim() !== "") {
//           errorMessage = errorBody.message;
//         }
//       } catch {
//         // ignore JSON parse errors, keep default message
//       }

//       throw new Error(errorMessage);
//     }

//     return await response.json();
//   } catch (err: unknown) {
//     // Ensure we always throw a string
//     const fallbackMessage =
//       err instanceof Error && typeof err.message === "string" && err.message.trim() !== ""
//         ? err.message
//         : "Failed to fetch auth API";

//     console.error("apiAuthFetch error:", err);
//     throw new Error(fallbackMessage);
//   }
// }

export async function sendAccessToken(accessToken: string){
    return apiFetch("/profile", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
    })
}

export async function fetchGithubUserRepo(accessToken: string){
    return apiFetch("/userrepo", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
    })
}

export async function fetchGithubTopLanguage(accessToken: string){
  return apiFetch("/top-languages", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
  })
}


// services/api.ts

interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    githubId: number;
    login: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    accessToken: string;
    lastSyncedAt: string;
  };
}

export async function createOrUpdateUser(session: Session): Promise<AuthResponse["user"]> {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: session.accessToken,
        profile: {
          id: session.user.id,
          login: session.user.login,
          name: session.user.name,
          email: session.user.email,
          avatar_url: session.user.image,
        },
      }),
    });

    if (!response.ok) {
      let errorMessage = "Auth request failed";

      try {
        const errorBody = await response.json();
        if (typeof errorBody?.message === "string" && errorBody.message.trim() !== "") {
          errorMessage = errorBody.message;
        }
      } catch {
        // ignore parse errors, keep default message
      }

      // 🔒 Always coerce to string
      throw new Error(String(errorMessage));
    }

    const data: AuthResponse = await response.json();
    return data.user;
  } catch (err: unknown) {
    console.error("createOrUpdateUser error:", err);

    // 🔒 Always coerce to string
    const fallbackMessage =
      err instanceof Error && typeof err.message === "string" && err.message.trim() !== ""
        ? err.message
        : "Failed to fetch auth API";

    throw new Error(String(fallbackMessage));
  }
}