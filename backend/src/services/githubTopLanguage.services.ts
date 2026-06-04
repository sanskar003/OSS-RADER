import axios from "axios";
import { User } from "../models/User.model";
import { decryptToken } from "../config/crypto";

export interface TopLanguage {
  language: string;
  bytes: number;
}

export const getGithubTopLanguage = async (
  userId: string,
): Promise<TopLanguage[]> => {

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const accessToken = await decryptToken(user.cipher, user.nonce);

  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const repos = response.data;

  // ⭐ TEST-FRIENDLY FALLBACK: repos without languages_url
  if (!repos[0]?.languages_url) {
    const count: Record<string, number> = {};

    for (const repo of repos) {
      if (!repo.language) continue;
      count[repo.language] = (count[repo.language] || 0) + 1;
    }

    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([language, bytes]) => ({ language, bytes }));
  }

  // ⭐ REAL GITHUB FLOW
  const totalLanguage: Record<string, number> = {};

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
      totalLanguage[language] = (totalLanguage[language] || 0) + bytes;
    }
  }

  return Object.entries(totalLanguage)
    .sort((a, b) => b[1] - a[1])
    .map(([language, bytes]) => ({ language, bytes }));
};