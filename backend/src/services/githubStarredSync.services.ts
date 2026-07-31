import axios from "axios";
import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model";
import { Starred } from "../models/Starred.model";

export const getGithubStarredSync = async (userId: number) => {

    const user = await User.findById(userId)

    if (!user) throw new Error("User not found");

    const accessToken = await decryptToken(user.cipher, user.nonce)

    const response = await axios.get("https://api.github.com/user/starred", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
        },
    })

    const starredRepos = response.data
    
    const savedRepos = await Promise.all(
    starredRepos.map(async (repo: any) => {

      // optional: fetch languages
      const languagesResponse = await axios.get(
        repo.languages_url,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      return Starred.findOneAndUpdate(
        // {
        //   userId,
        //   repoId: repo.id,
        // },

        {
          // userId,

          repoId: repo.id,

          name: repo.name,

          fullName: repo.full_name,

          description: repo.description,

          stars: repo.stargazers_count,

          forks: repo.forks_count,

          language: repo.language,

          languages: languagesResponse.data,

          isPrivate: repo.private,

          htmlUrl: repo.html_url,

          pushedAt: repo.pushed_at
            ? new Date(repo.pushed_at)
            : undefined,
        },

        {
          upsert: true,
          new: true,
        }
      );
    })
  );
}