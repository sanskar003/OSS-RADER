"use client";

import { useGithubRepo } from "@/hooks/useGithubRepo";

export default function Userrepo() {
  const { data, isLoading, error } = useGithubRepo();

  if (isLoading) return <p className="text-3xl">Loading...</p>;

  if (error || !data)
    return <p className="text-red-500">Failed to load Repos</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your GitHub Repositories</h1>

      <div className="grid gap-4">
        {data.map((repo) => (
          <div
            key={repo.full_name}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {repo.name}
                </h2>

                <p className="text-gray-600 text-sm">
                  {repo.full_name}
                </p>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                className="text-blue-500 text-sm underline"
              >
                View
              </a>
            </div>

            <p className="mt-2 text-gray-700">
              {repo.description || "No description"}
            </p>

            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>🧠 {repo.language || "Unknown"}</span>
              <span className={repo.visibility === "private" ? "text-red-500" : "text-green-600"}>
                {repo.visibility}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}