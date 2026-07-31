"use client"

import { useGithubProfile } from "@/hooks/useGithubProfile";
import LogoutButton from "@/components/LogoutButton";

export default function Profile() {
    const { data, isLoading, error } = useGithubProfile()

    if (isLoading) return <p className="text-3xl">Loading...</p>

    if (error || !data) return <p className="text-red-500">Failed to load profile</p>

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            {/* HEADER */}
            <LogoutButton />
            <div className="flex items-center gap-4">
                <img
                    src={data.identity.avatar}
                    className="w-20 h-20 rounded-full"
                />

                <div>
                    <h1 className="text-2xl font-bold">
                        {data.identity.name}
                    </h1>
                    <p className="text-gray-600">
                        @{data.identity.username}
                    </p>
                </div>
            </div>

            {/* ABOUT */}
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                <p><b>Bio:</b> {data.about.bio || "N/A"}</p>
                <p><b>Location:</b> {data.about.location || "N/A"}</p>
                <p><b>Company:</b> {data.about.company || "N/A"}</p>
                <p><b>Email:</b> {data.about.email || "N/A"}</p>
                <p><b>Hireable:</b> {data.about.hireable ? "Yes" : "No"}</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Followers</p>
                    <p className="text-xl font-bold">{data.stats.followers}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Following</p>
                    <p className="text-xl font-bold">{data.stats.following}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Repos</p>
                    <p className="text-xl font-bold">{data.stats.publicRepos}</p>
                </div>

                <div className="bg-white p-4 shadow">
                    <p className="text-gray-500">Gists</p>
                    <p className="text-xl font-bold">{data.stats.publicGists}</p>
                </div>
            </div>

            {/* META */}
            <div className="text-sm text-gray-500">
                <p>Joined: {new Date(data.meta.createdAt).toDateString()}</p>
                <p>Updated: {new Date(data.meta.updatedAt).toDateString()}</p>
            </div>

            {/* LINK */}
            <a
                href={data.identity.githubUrl}
                target="_blank"
                className="text-blue-500 underline"
            >
                View GitHub Profile
            </a>
            <h1 className="text-2xl font-bold">Profile</h1>
        </div>
    )
}