import { GithubProfile } from "@/types/GithubProfile.types";

type Props = {
  profile: GithubProfile;
  totalStars: number;
};

export default function QuickStatsChart({profile, totalStars}: Props) {

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bricolage text-xl font-semibold mb-6">
        Quick Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="font-sans bg-gray-50 hover:bg-emerald-300 hover:text-white transition-all duration-300 rounded-full p-4 text-center">
          <p className="text-gray-500">Followers</p>
          <p className="text-2xl font-bold">
            {profile.stats.followers}
          </p>
        </div>

        <div className="font-sans bg-gray-50 hover:bg-emerald-300 hover:text-white transition-all duration-300 rounded-full p-4 text-center">
          <p className="text-gray-500">Following</p>
          <p className="text-2xl font-bold">
            {profile.stats.following}
          </p>
        </div>

        <div className="font-sans bg-gray-50 hover:bg-emerald-300 hover:text-white transition-all duration-300 rounded-full p-4 text-center">
          <p className="text-gray-500">Repositories</p>
          <p className="text-2xl font-bold">
            {profile.stats.publicRepos}
          </p>
        </div>

        <div className="font-sans bg-gray-50 hover:bg-emerald-300 hover:text-white transition-all duration-300 rounded-full p-4 text-center">
          <p className="text-gray-500">Total Stars</p>
          <p className="text-2xl font-bold">
            {totalStars}
          </p>
        </div>
      </div>
    </div>
  );
}