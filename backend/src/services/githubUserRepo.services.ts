import axios from "axios";

export const getGithubUserRepo = async (accessToken: string) => {
  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userrepo = response.data;
  
  return userrepo.map((repo: any) => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language,
    languages_url: repo.languages_url,
    visibility: repo.visibility,
    updated_at: repo.updated_at,
  }));
};
