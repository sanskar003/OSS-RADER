import { fetchGithubRecommendation } from "@/lib/api/github";
import { useQuery } from "@tanstack/react-query";

export const useGithubRecommendation = () => {
    return useQuery({
        queryKey:["github-recommendation"],
        queryFn: fetchGithubRecommendation,
    })
}