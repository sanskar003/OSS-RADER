import { fetchGithubProfile } from "@/lib/api/github"
import { useQuery } from "@tanstack/react-query"


export const useGithubProfile = () => {
    return useQuery({
        queryKey: ["github-profile"],
        queryFn: fetchGithubProfile
    })
}