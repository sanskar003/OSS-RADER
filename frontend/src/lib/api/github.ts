import { GithubProfile } from "@/types/GithubProfile.types";
import { GithubRepo } from "@/types/GithubRepo.types";
import { GithubTopLanguageResponse } from "@/types/GithubTopLanguage.types";

//GITHUB PROFILE
export const fetchGithubProfile = async ():Promise<GithubProfile> => {
    const res = await fetch(
        "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/project/profile",
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
export const fetchGithubRepo = async ():Promise<GithubRepo[]> => {
    const res = await fetch(
        "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/project/userrepo",
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
    "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/project/toplanguages",
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