
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
