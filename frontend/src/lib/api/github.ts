import { GithubProfile } from "@/types/GithubProfile.types";
import { GithubRepo } from "@/types/GithubRepo.types";
import { GithubTopLanguageResponse } from "@/types/GithubTopLanguage.types";
import { RepoQuery } from "@/types/RepoQuery.types";



//GITHUB PROFILE
export const fetchGithubProfile = async (): Promise<GithubProfile> => {
  const res = await fetch(
    "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/project/profile",
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data.profile;
}

//GITHUB REPO
export const fetchGithubRepo = async (): Promise<GithubRepo[]> => {
  const res = await fetch(
    "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/project/userrepo",
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch repos");
  }

  return data.userrepo;
}

//GITHUB TOP LANGUAGE
export const fetchGithubTopLanguage = async (): Promise<GithubTopLanguageResponse> => {
  const res = await fetch(
    "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/project/toplanguages",
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch languages");
  }

  return {
    topLanguage: data.topLanguage,
    languages: data.languages,
  };
};

//REPOS
export const fetchRepo = async (filters: RepoQuery) => {
  const params = new URLSearchParams

  params.append("page", String(filters.page))
  params.append("limit", String(filters.limit))
  params.append("sort", String(filters.sort))

  if (filters.language) {
    params.append("language", filters.language);
  }

  if (filters.topic) {
    params.append("topic", filters.topic);
  }

  if (filters.minStars) {
    params.append("minStars", String(filters.minStars));
  }

  const res = await fetch(`https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/repos?${params.toString()}`)

  if(!res.ok){
    throw new Error("Failed to fetch repos")
  }

  return res.json();

};