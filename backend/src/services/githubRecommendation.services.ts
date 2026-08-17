import axios from "axios";
import { Starred } from "../models/Starred.model";
import { getGithubTopLanguage } from "./githubTopLanguage.services";

export const getGithubRecommendation = async (userId: string) => {
  // Get user's top languages
  const topLanguages = await getGithubTopLanguage(userId);

  if (!topLanguages.length) {
    return [];
  }

  // Get repositories already starred by the user
  const starredRepos = await Starred.find({
    userId,
  }).lean();

  const starredIds = new Set(
    starredRepos.map((repo) => repo.repoId),
  );

  // Calculate total language usage
  const totalBytes = topLanguages.reduce(
    (total, item) => total + item.bytes,
    0,
  );

  // Create language preference weights
  const languageWeights = new Map<string, number>();

  for (const item of topLanguages) {
    languageWeights.set(
      item.language,
      item.bytes / totalBytes,
    );
  }

  const recommendations: any[] = [];

  // Search GitHub for user's top languages
  for (const item of topLanguages.slice(0, 3)) {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        params: {
          q: `language:${item.language} stars:>100`,
          sort: "stars",
          order: "desc",
          per_page: 10,
        },
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    recommendations.push(...response.data.items);
  }

  // Remove repos already starred by the user
  const filtered = recommendations.filter(
    (repo) => !starredIds.has(repo.id),
  );

  //  Remove duplicate repositories
  const uniqueRepos = Array.from(
    new Map(
      filtered.map((repo) => [repo.id, repo]),
    ).values(),
  );

  // Find highest star count
  const maxStars = Math.max(
    ...uniqueRepos.map((repo) => repo.stargazers_count),
  );

  // Score repositories
  const scoredRepos = uniqueRepos.map((repo) => {
    const languageScore =
      languageWeights.get(repo.language) ?? 0;

    const popularityScore =
      repo.stargazers_count / maxStars;

    const score = languageScore * 0.7 + popularityScore * 0.3;

    return {
      repoId: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      htmlUrl: repo.html_url,
      pushedAt: repo.pushed_at,

      score: Number(score.toFixed(4)),
    };
  });

  // 10. Highest score first
  return scoredRepos.sort(
    (a, b) => b.score - a.score,
  );
};