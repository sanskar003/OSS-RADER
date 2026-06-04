import { fetchGithubRepo } from "@/lib/api/github"
import { useQuery } from "@tanstack/react-query"

export const useGithubRepo = () => {
    return useQuery({
        queryKey: ["github-userrepo"],
        queryFn: fetchGithubRepo
    })
}   