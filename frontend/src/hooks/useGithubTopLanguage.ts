import { fetchGithubTopLanguage } from "@/lib/api/github";
import { useQuery } from "@tanstack/react-query";


export const useGithubTopLanguage = () => {
  return useQuery({
    queryKey: ["github-toplanguages"],
    queryFn: fetchGithubTopLanguage,
  });
};