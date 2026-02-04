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
