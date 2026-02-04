import { RepoCard } from "@/components/RepoCard";
import { fetchTrendingRepos } from "@/lib/fetchTrending";

export default async function TrendingPage() {
  const response = await fetchTrendingRepos();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Trending Repositories</h1>
      <p className="text-gray-600 mt-1">
        Most starred projects on GitHub right now
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {response.map((repo: any) => (
          <RepoCard key={repo.url} {...repo} />
        ))}
      </div>
    </div>
  );
}
