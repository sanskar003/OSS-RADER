import axios from "axios"

// GitHub public API client (no user login required)
// Used for fetching public repos and general GitHub data using app-level token
export const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: process.env.GITHUB_TOKEN
      ? `Bearer ${process.env.GITHUB_TOKEN}`
      : undefined,
  },
});