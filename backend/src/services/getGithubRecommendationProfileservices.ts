interface RecommendationProfile {
  languages: string[];
  topics: {
    topic: string;
    count: number;
  }[];
}

export const getGithubRecommendationProfile = (
    topLanguages: {language: string; bytes: number}[],
    starredRepos: {topics?: string[]}[]
): RecommendationProfile => {
    const languages = topLanguages.slice(0, 3).map(lan => lan.language);

    const topicFrequency = new Map<string, number>
    for(const repos of starredRepos){
        for(const topic of repos.topics ?? []){
            topicFrequency.set(topic, (topicFrequency.get(topic) ?? 0) + 1)
        }
    }

    const topics = Array.from(topicFrequency.entries())
                        .map(([topic, count]) => ({topic, count}))
                        .sort((a, b) => b.count - a.count); 

    return{languages, topics}
}