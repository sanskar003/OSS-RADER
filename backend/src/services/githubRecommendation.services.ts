import axios from "axios";
import { Starred } from "../models/Starred.model";
import { getGithubTopLanguage } from "./githubTopLanguage.services";
import { getGithubAccesstoken } from "./getGithubAccessToken.services";
import { getGithubRecommendationProfile } from "./getGithubRecommendationProfileservices";
import { getGithubRecommendationScore } from "./getGithubRecommendationScore.services";

export const getGithubRecommendation = async (userId: string) => {
  // Get GitHub access token
  const githubAccessToken =
    await getGithubAccesstoken(userId);

  // Get user's top languages
  const topLanguages =
    await getGithubTopLanguage(userId);

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

  // Build user's recommendation profile
  const recommendationProfile =
    getGithubRecommendationProfile(
      topLanguages,
      starredRepos,
    );

    console.log(
  "Recommendation Profile:",
  JSON.stringify(recommendationProfile, null, 2),
);

  const recommendations: any[] = [];

  // Search GitHub using user's preferred languages
  for (const language of Object.keys(
    recommendationProfile.languages,
  )) {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        params: {
          q: `language:${language} stars:>100`,
          sort: "stars",
          order: "desc",
          per_page: 10,
        },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${githubAccessToken}`,
        },
      },
    );

    recommendations.push(...response.data.items);
  }

  // Remove repositories already starred by the user
  const filtered = recommendations.filter(
    (repo) => !starredIds.has(repo.id),
  );

  // Remove duplicate repositories
  const uniqueRepos = Array.from(
    new Map(
      filtered.map((repo) => [repo.id, repo]),
    ).values(),
  );

  if (!uniqueRepos.length) {
    return [];
  }

  // Score repositories against user's profile
  const scoredRepos =
    getGithubRecommendationScore(
      uniqueRepos,
      recommendationProfile,
    );

  // Highest score first
  return scoredRepos.sort(
    (a, b) => b.score - a.score,
  );
};