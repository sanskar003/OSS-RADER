import { fetchGithubTopLanguage } from "@/lib/api/github";
import { GithubTopLanguageResponse } from "@/types/GithubTopLanguage.types";
import { useQuery } from "@tanstack/react-query";


export const useGithubTopLanguage = () => {
  return useQuery<GithubTopLanguageResponse>({
    queryKey: ["github-toplanguages"],
    queryFn: fetchGithubTopLanguage,
  });
};