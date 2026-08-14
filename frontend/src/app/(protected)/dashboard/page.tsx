"use client";

import QuickStatsChart from "@/components/QuickStatsChart";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import TopLanguagesChart from "@/components/TopLanguagesChart";
import { useGithubProfile } from "@/hooks/useGithubProfile";
import { useGithubRepo } from "@/hooks/useGithubRepo";
import { useGithubTopLanguage } from "@/hooks/useGithubTopLanguage";
import { Star, GitFork, Code2 } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function Dashboard() {
  const { data: profile, isLoading: profileLoading, error: profileError } = useGithubProfile();

  const { data: repos, isLoading: repoLoading, error: repoError } = useGithubRepo();

  const { data: languages, isLoading: languageLoading, error: languageError } = useGithubTopLanguage();

  if (profileLoading || repoLoading || languageLoading) {
    return <DashboardSkeleton/>;
  }

  if (profileError || repoError || languageError || !profile || !repos || !languages) {
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

      {/* ========================= */}
      {/* PROFILE */}
      {/* ========================= */}

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.identity.avatar}
            alt={profile.identity.name}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <h1 className="font-bricolage flex gap-2 text-2xl font-semibold">
              <span className="font-normal">Welcome back,</span> {profile.identity.name} <Sparkles color="gold"/>
            </h1>

            <p className="font-sans text-gray-500">
              @{profile.identity.username}
            </p>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* DASHBOARD */}
      {/* ========================= */}

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Stats */}
          <QuickStatsChart
            profile={profile}
            totalStars={totalStars}
          />

          {/* Most Starred Repository */}
          {mostStarredRepo && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bricolage text-xl font-semibold mb-4">
                Most Popular Repository
              </h2>

              <h3 className="font-sans text-lg font-bold">
                {mostStarredRepo.name}
              </h3>

              <p className="font-sans text-gray-500 mt-2">
                {mostStarredRepo.description || "No description"}
              </p>

              <div className="font-mono flex flex-wrap gap-5 mt-4 text-sm font-medium">
                <span className="flex gap-2 border rounded-full px-2 py-1"><Star size={20} /> {mostStarredRepo.stargazers_count} </span>
                <span className="flex gap-2 border rounded-full px-2 py-1"><GitFork size={20} /> {mostStarredRepo.forks_count}</span>
                <span className="flex gap-2 border rounded-full px-2 py-1"><Code2 size={20} /> {mostStarredRepo.language}</span>
              </div>
            </div>
          )}

        </div>

        {/* Right Side */}
        <div className="bg-white border lg:col-span-2 bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-bricolage text-xl font-semibold mb-6">
            Top Languages
          </h2>

          <TopLanguagesChart
            languages={languages.languages}
          />
        </div>

      </section>

      {/* 

      <section>

      </section> */}





      {/* ========================= */}
      {/* RECENT REPOS */}
      {/* ========================= */}

      <section>
        <h2 className="font-bricolage text-xl font-semibold mb-4">
          Recently Updated Repositories
        </h2>

        <div className="space-y-3">
          {recentRepos.map((repo) => (
            <div
              key={repo.full_name}
              className="font-sans bg-white rounded-lg shadow p-4"
            >
              <h3 className="font-semibold">
                {repo.name}
              </h3>

              <p className="text-sm text-gray-500">
                {repo.description ||
                  "No description available"}
              </p>

              <div className="font-mono flex gap-4 mt-2 text-sm">
                <span className="flex gap-2 border rounded-full px-2 py-1"><Star size={20} />  {repo.stargazers_count}</span>
                <span className="flex gap-2 border rounded-full px-2 py-1"><GitFork size={20} />  {repo.forks_count}</span>
                <span className="flex gap-2 border rounded-full px-2 py-1"><Code2 size={20} /> {repo.language}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}