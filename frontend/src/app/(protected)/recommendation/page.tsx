"use client"

import { useGithubRecommendation } from "@/hooks/useGithubRecommendation"

export default function RecommendationPage() {
    const { data, isLoading, error } = useGithubRecommendation()

    // Loading State
    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <p className="font-sans text-sm text-gray-500">
                    Loading recommendations...
                </p>
            </div>
        )
    }

    // Error State
    if (error || !data) {
        return (
            <div className="p-8 max-w-md mx-auto text-center border border-red-100 bg-red-50/50 rounded-2xl my-12">
                <p className="font-sans font-medium text-red-600">
                    Failed to load recommendations
                </p>
                <p className="font-sans text-xs text-red-400 mt-1">
                    Please check your connection or try again.
                </p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            
            {/* HEADER */}
            <div>
                <h1 className="font-bricolage text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
                    Recommendations
                </h1>

                <p className="font-sans text-sm text-gray-500 dark:text-zinc-400 mt-1">
                    Repositories selected based on your GitHub activity.
                </p>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="space-y-3">
                {data.map((repo) => (
                    <div
                        key={repo.repoId}
                        className="bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl space-y-3"
                    >
                        {/* NAME */}
                        <div>
                            <h2 className="font-bricolage text-lg font-semibold text-gray-900 dark:text-zinc-50">
                                {repo.fullName}
                            </h2>

                            {repo.description && (
                                <p className="font-sans text-sm text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                                    {repo.description}
                                </p>
                            )}
                        </div>

                        {/* METADATA */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300">
                                ⭐ {repo.stars}
                            </span>

                            <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300">
                                Forks {repo.forks}
                            </span>

                            {repo.language && (
                                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                                    {repo.language}
                                </span>
                            )}

                            <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
                                Score {repo.score}
                            </span>
                        </div>

                        {/* TOPICS */}
                        {repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {repo.topics.map((topic) => (
                                    <span
                                        key={topic}
                                        className="text-[11px] px-2 py-1 rounded-md bg-gray-50 dark:bg-zinc-800/60 text-gray-500 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800"
                                    >
                                        #{topic}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* GITHUB LINK */}
                        <div className="pt-2">
                            <a
                                href={repo.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-sm font-medium text-emerald-600 hover:text-emerald-700"
                            >
                                View repository →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}