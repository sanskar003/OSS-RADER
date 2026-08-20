interface RecommendationProfile {
  languages: Record<string, number>;
  topics: {
    topic: string;
    count: number;
    weight: number;
}[]
}

export const getGithubRecommendationProfile = (
  topLanguages: { language: string; bytes: number }[],
  starredRepos: { topics?: string[] }[],
): RecommendationProfile => {
  // LANGUAGE
  const topThreeLanguages = topLanguages.slice(0, 3);

  const totalBytes = topThreeLanguages.reduce(
    (acc, curr) => acc + curr.bytes,
    0,
  );

  const languages = topThreeLanguages.reduce<
    Record<string, number>
  >((acc, lan) => {
    acc[lan.language] =
      totalBytes > 0
        ? lan.bytes / totalBytes
        : 0;

    return acc;
  }, {});

  // TOPIC
  const topicFrequency = new Map<string, number>();

  for (const repo of starredRepos) {
    for (const topic of repo.topics ?? []) {
      topicFrequency.set(
        topic,
        (topicFrequency.get(topic) ?? 0) + 1,
      );
    }
  }

  const totalTopicCount = Array.from(
    topicFrequency.values(),
  ).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const topics = Array.from(
    topicFrequency.entries(),
  )
    .map(([topic, count]) => ({
      topic,
      count,
      weight:
        totalTopicCount > 0
          ? count / totalTopicCount
          : 0,
    }))
    .sort((a, b) => b.weight - a.weight);
    

  return {
    languages,
    topics,
  };
};