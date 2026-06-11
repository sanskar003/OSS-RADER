"use client";

import { useTrendingRepos } from "@/hooks/useTrendingRepo";


export default function TrendingPage() {
  const {
    data: repos,
    isLoading,
    error,
  } = useTrendingRepos();

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading trending repositories...</p>
      </div>
    );
  }

  if (error || !repos) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Failed to load trending repositories.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          🔥 Trending Open Source Projects
        </h1>

        <p className="text-gray-500 mt-2">
          Discover popular repositories from GitHub.
        </p>
      </div>

      {/* Repo Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo: any) => (
          <div
            key={repo.url}
            className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">
                {repo.name}
              </h2>

              {repo.language && (
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {repo.language}
                </span>
              )}
            </div>

            <p className="text-gray-600 mt-3">
              {repo.description || "No description available"}
            </p>

            <div className="flex gap-4 mt-4 text-sm">
              <span>⭐ {repo.stars.toLocaleString()}</span>
              <span>🍴 {repo.forks.toLocaleString()}</span>
            </div>

            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Repository →
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}