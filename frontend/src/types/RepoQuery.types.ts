export type RepoQuery = {
    page: number,
    limit: number,
    language?: string,
    topic?: string,
    sort: "stars" | "forks" | "updated",
    minStars?: number
}