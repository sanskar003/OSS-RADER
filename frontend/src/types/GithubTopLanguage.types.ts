export type GithubTopLanguage = {
  language: string;
  bytes: number;
};

export type GithubTopLanguageResponse = {
  topLanguage: string | null;
  languages: GithubTopLanguage[];
};