import axios from "axios";

export interface TopLanguage {
  language: string;
  bytes: number;
}

export const getGithubTopLanguage = async (
  accessToken: string,
): Promise<TopLanguage[]> => {
  let response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let repos = response.data;

  let totalLanguage: Record<string, number> = {};

  const languageRequests = repos
    .filter((repo: any) => repo.languages_url)
    .map((repo: any) =>
      axios.get(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

  const languageResponses = await Promise.all(languageRequests);

  for (const langResponse of languageResponses) {
    const languages: Record<string, number> = langResponse.data;

    for (const [language, bytes] of Object.entries(languages)) {
      if (!totalLanguage[language]) {
        totalLanguage[language] = 0;
      }
      totalLanguage[language] += bytes;
    }
  }

  const sortedLanguages: TopLanguage[] = Object.entries(totalLanguage)
    .sort((a, b) => b[1] - a[1])
    .map(([language, bytes]) => ({ language, bytes }));

  return sortedLanguages;
};
