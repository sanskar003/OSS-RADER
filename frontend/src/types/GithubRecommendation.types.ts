export type GithubRecommendation = {
    repoId: number;
    name: string;
    fullName: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    topics: string[];
    htmlUrl: string;
    pushedAt: string;
    score: number;
}