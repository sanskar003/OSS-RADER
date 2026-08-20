interface RecommendationProfile {
    languages: Record<string, number>;
    topics: {
        topic: string;
        count: number;
        weight: number;
    }[];
}

interface GithubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics?: string[];
    html_url: string;
    pushed_at: string;
}

export const getGithubRecommendationScore = (
    repositories: GithubRepository[],
    recommendationProfile: RecommendationProfile,
) => {
    if (!repositories.length) {
        return [];
    }

    const maxStars = Math.max(...repositories.map(
        (repo) => repo.stargazers_count,
    ),
    );

    return repositories.map((repo) => {
        const languageScore = recommendationProfile.languages[repo.language ?? ""] ?? 0;

        const topicScore = (repo.topics ?? []).reduce(
            (score, repoTopic) => {
                return (
                    score +
                    (recommendationProfile.topics.find(
                        (topic) => topic.topic === repoTopic,
                    )?.weight ?? 0)
                );
            },
            0,
        );

        const popularityScore = maxStars > 0 ? repo.stargazers_count / maxStars : 0;

        const score = languageScore * 0.5 + topicScore * 0.3 + popularityScore * 0.2;
        console.log({
            repo: repo.full_name,
            languageScore,
            topicScore,
            popularityScore,
            score,
        });

        return {
            repoId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics ?? [],
            htmlUrl: repo.html_url,
            pushedAt: repo.pushed_at,
            score: Number(score.toFixed(4)),
        };
    });
}