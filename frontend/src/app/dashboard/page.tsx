"use client";

import { useGithubProfile } from "@/hooks/useGithubProfile";
import { useGithubRepo } from "@/hooks/useGithubRepo";
import { useGithubTopLanguage } from "@/hooks/useGithubTopLanguage";

export default function Dashboard() {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGithubProfile();

  const {
    data: repos,
    isLoading: repoLoading,
    error: repoError,
  } = useGithubRepo();

  const {
    data: languages,
    isLoading: languageLoading,
    error: languageError,
  } = useGithubTopLanguage();

  if (profileLoading || repoLoading || languageLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (
    profileError ||
    repoError ||
    languageError ||
    !profile ||
    !repos ||
    !languages
  ) {
    return (
      <p className="p-6 text-red-500">
        Failed to load dashboard
      </p>
    );
  }

  // =========================
  // DERIVED DATA
  // =========================

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const mostStarredRepo = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  const recentRepos = [...repos]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )
    .slice(0, 5);

  return (
    <main className="p-6 space-y-8">
      {/* ========================= */}
      {/* WELCOME */}
      {/* ========================= */}
       {(profile.stats?.topics || []).map((topic: string) => (
                <span
                    key={topic}
                    className="px-2 py-1 bg-blue-100 rounded-md"
                >
                    {topic}
                </span>
            ))}

      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.identity.avatar}
            alt={profile.identity.name}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {profile.identity.name} 👋
            </h1>

            <p className="text-gray-500">
              @{profile.identity.username}
            </p>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* QUICK STATS */}
      {/* ========================= */}

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Quick Stats
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Followers</p>
            <p className="text-2xl font-bold">
              {profile.stats.followers}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Following</p>
            <p className="text-2xl font-bold">
              {profile.stats.following}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Repositories</p>
            <p className="text-2xl font-bold">
              {profile.stats.publicRepos}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Total Stars</p>
            <p className="text-2xl font-bold">
              {totalStars}
            </p>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* TOP LANGUAGES */}
      {/* ========================= */}

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Top Languages
        </h2>

        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <p>
            <strong>Most Used:</strong>{" "}
            {languages.topLanguage}
          </p>

          {languages.languages.map((lang) => (
            <div
              key={lang.language}
              className="flex justify-between border-b py-2"
            >
              <span>{lang.language}</span>
              
            </div>
          ))}
        </div>
      </section>

      {/* ========================= */}
      {/* MOST STARRED REPO */}
      {/* ========================= */}

      {mostStarredRepo && (
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Most Popular Repository
          </h2>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg">
              {mostStarredRepo.name}
            </h3>

            <p className="text-gray-500">
              {mostStarredRepo.description ||
                "No description"}
            </p>

            <div className="flex gap-4 mt-3">
              <span>
                ⭐ {mostStarredRepo.stargazers_count}
              </span>

              <span>
                🍴 {mostStarredRepo.forks_count}
              </span>

              <span>
                💻 {mostStarredRepo.language}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* RECENT REPOS */}
      {/* ========================= */}

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Recently Updated Repositories
        </h2>

        <div className="space-y-3">
          {recentRepos.map((repo) => (
            <div
              key={repo.full_name}
              className="bg-white rounded-lg shadow p-4"
            >
              <h3 className="font-semibold">
                {repo.name}
              </h3>

              <p className="text-sm text-gray-500">
                {repo.description ||
                  "No description available"}
              </p>

              <div className="flex gap-4 mt-2 text-sm">
                <span>⭐ {repo.stargazers_count}</span>

                <span>🍴 {repo.forks_count}</span>

                <span>{repo.language}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= */}
      {/* EXTRA INSIGHTS */}
      {/* ========================= */}

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Insights
        </h2>

        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <p>
            🚀 Most Used Language:
            <strong> {languages.topLanguage}</strong>
          </p>

          <p>
            ⭐ Total Stars:
            <strong> {totalStars}</strong>
          </p>

          <p>
            🍴 Total Forks:
            <strong> {totalForks}</strong>
          </p>

          <p>
            📦 Total Repositories:
            <strong> {repos.length}</strong>
          </p>
        </div>
      </section>
    </main>
  );
}