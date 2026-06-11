import axios from "axios";
import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model"

export const getGithubStarred = async (userId: number) => {

    const user = await User.findById(userId)
    
    if (!user) throw new Error("User not found");

    const accessToken = await decryptToken(user.cipher, user.nonce)

    const response = await axios.get("https://api.github.com/user/starred", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
        },
    })

    return response.data.map((repo: any) => ({
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
    }));

}