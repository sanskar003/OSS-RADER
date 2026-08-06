"use client";

import { useGithubRepo } from "@/hooks/useGithubRepo";
import { Star, GitFork, Code2 } from "lucide-react";


export default function Userrepo() {
  const { data, isLoading, error } = useGithubRepo();

  if (isLoading) return <p className="text-3xl">Loading...</p>;

  if (error || !data)
    return <p className="text-red-500">Failed to load Repos</p>;

  return (
   <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
  {/* Header Section */}
  <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="font-bricolage text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Your GitHub Repositories
      </h1>
    </div>
  </div>

  {/* Repository Grid */}
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
    {data.map((repo) => (
      <div 
        key={repo.full_name} 
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md"
      >
        <div>
          {/* Card Top Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-sans text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors">
                {repo.name}
              </h2>
              <p className="font-mono text-xs text-zinc-400">
                {repo.full_name}
              </p>
            </div>
            
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            >
              View
            </a>
          </div>

          {/* Description */}
          <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-600 line-clamp-2">
            {repo.description || "No description provided."}
          </p>

          {/* Topic Tags */}
          {repo.topics?.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 4).map((topic) => (
                <span 
                  key={topic} 
                  className="inline-flex items-center rounded-lg bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 4 && (
                <span className="text-xs text-zinc-400 self-center font-medium pl-1">
                  +{repo.topics.length - 4} more
                </span>
              )}
            </div>
          ) : (
            <p className="mt-4 text-xs italic text-zinc-400">No topics</p>
          )}
        </div>

        {/* Card Footer Info */}
        <div className="mt-6 pt-4 border-t border-zinc-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Metrics */}
          <div className="font-mono flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 text-zinc-600">
              <Star size={14} className="text-amber-500 fill-amber-500/10" /> 
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 text-zinc-600">
              <GitFork size={14} className="text-zinc-400" /> 
              {repo.forks_count}
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1 text-zinc-600">
              <Code2 size={14} className="text-blue-500" /> 
              {repo.language || "Markdown"}
            </span>
          </div>

          {/* Status & Date */}
          <div className="font-sans flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium uppercase tracking-wider text-[10px] ${
              repo.visibility === "private" 
                ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10" 
                : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10"
            }`}>
              {repo.visibility}
            </span>
            <span className="font-sans text-zinc-400">
              {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

      </div>
    ))}
  </div>
</div>

  );
}