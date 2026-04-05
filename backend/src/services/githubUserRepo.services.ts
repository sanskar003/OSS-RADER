import axios from "axios";
import { User } from "../models/User.model";
import { decryptToken } from "../config/crypto";

export const getGithubUserRepo = async (githubId: number) => {

  const user = await User.findOne({ githubId });
  if(!user) throw new Error("User not found");

  const accessToken = await decryptToken(user.cipher, user.nonce);

  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userrepo = response.data;
  
  return userrepo.map((repo: any) => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language,
    languages_url: repo.languages_url,
    visibility: repo.visibility,
    updated_at: repo.updated_at,
  }));
};
