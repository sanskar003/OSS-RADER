import { githubClient } from "../utils/apiClient";
import { RepoQuery } from "../schemas/zod.schema"



export const handleRepo = async (
    filters: RepoQuery,
) => {
    const queryParts: string[] = [];

    if (filters.language) {
        queryParts.push(`language:${filters.language}`);
    }

    if (filters.topic) {
        queryParts.push(`topic:${filters.topic}`);
    }

    if (filters.minStars) {
        queryParts.push(`stars:>=${filters.minStars}`);
    }

    if (queryParts.length === 0) {
        queryParts.push("stars:>1000");
    }

    const response = await githubClient.get("/search/repositories", {
        params: {
            q: queryParts.join(" "),
            sort: filters.sort ?? "stars",
            order: "desc",
            page: filters.page,
            per_page: filters.limit
        }
    })

    return {
        data: response.data.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            url: repo.html_url,
            owner: repo.owner.login,
            avatar: repo.owner.avatar_url,
        })),

        pagination: {
            page: filters.page,
            limit: filters.limit,
            total: response.data.total_count,
            hasNextPage:
                filters.page * filters.limit <
                response.data.total_count,
        },
    };
}   