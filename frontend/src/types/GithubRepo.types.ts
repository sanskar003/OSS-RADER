export type GithubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  topics: string[],
  visibility: "public" | "private" | string;
  updated_at: string;
};