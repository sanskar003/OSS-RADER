import { githubClient } from "../utils/apiClient";

export const getTrendingRepo = async () => {
  const response = await githubClient.get(
    "/search/repositories?q=stars:1000&sort=stars&order=desc",
  );

  return response.data.items.map((repo: any) => ({
    name: repo.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
  }));
};
