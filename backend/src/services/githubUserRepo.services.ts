import axios from "axios";
import { User } from "../models/User.model";
import { decryptToken } from "../config/crypto";

export const getGithubUserRepo = async (userId: string) => {

  const user = await User.findById(userId);
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
    description: repo.description,
    
    language: repo.language,
    topics: repo.topics || [],
    
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    
    html_url: repo.html_url,
    languages_url: repo.languages_url,
    visibility: repo.visibility,

    updated_at: repo.updated_at,
  }));
};
