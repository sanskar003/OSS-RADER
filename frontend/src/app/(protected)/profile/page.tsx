"use client"

import { useGithubProfile } from "@/hooks/useGithubProfile";
import LogoutButton from "@/components/LogoutButton";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton"

export default function Profile() {
    const { data, isLoading, error } = useGithubProfile()

    // Premium Skeleton Loading State
    if (isLoading) return <ProfileSkeleton/>
    

    // Clean Error State
    if (error || !data) {
        return (
            <div className="p-8 max-w-md mx-auto text-center border border-red-100 bg-red-50/50 rounded-2xl my-12">
                <p className="font-sans font-medium text-red-600">Failed to load GitHub profile</p>
                <p className="font-sans text-xs text-red-400 mt-1">Please check your connection or log in again.</p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6 selection:bg-emerald-500/20 selection:text-emerald-700">


            {/* HEADER */}
            <div className="flex items-center gap-5 pb-2">

                <div className="space-y-0.5 flex items-center gap-5">
                    <img
                        src={data.identity.avatar}
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h1 className="font-bricolage text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
                            {data.identity.name}
                        </h1>
                        <p className="font-sans text-emerald-600 font-medium text-sm">
                            @{data.identity.username}
                        </p>
                    </div>
                </div>
            </div>

            {/* ABOUT CARD */}
            <div className="font-sans bg-gray-50/70 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
                <p className="text-gray-700 dark:text-zinc-300 text-sm leading-relaxed">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">Bio</span>
                    {data.about.bio || "No biography provided."}
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800 text-sm text-gray-600 dark:text-zinc-400">
                    <div><span className="font-medium text-gray-400">Location:</span> {data.about.location || "—"}</div>
                    <div><span className="font-medium text-gray-400">Company:</span> {data.about.company || "—"}</div>
                    <div className="col-span-2 truncate"><span className="font-medium text-gray-400">Email:</span> {data.about.email || "—"}</div>
                </div>

                {data.about.hireable && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Available for hire
                    </div>
                )}
            </div>

            {/* STATS BENTO GRID */}
            <div className="font-sans grid grid-cols-2 gap-3">
                {[
                    { label: "Followers", value: data.stats.followers },
                    { label: "Following", value: data.stats.following },
                    { label: "Repositories", value: data.stats.publicRepos },
                    { label: "Gists", value: data.stats.publicGists }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900/20 border border-gray-100 dark:border-zinc-800/80 p-4 rounded-xl hover:border-gray-200 transition-colors">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 mt-0.5">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* ACTION & METADATA BAR */}
            <div className="font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <div className="text-[11px] text-gray-400 space-y-0.5">
                    <p>Joined: {new Date(data.meta.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <p>Updated: {new Date(data.meta.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                {/* TOP BAR / LOGOUT */}
                <div className="flex justify-end">
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}
