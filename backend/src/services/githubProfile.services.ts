import axios from "axios";
import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model";

export const getGithubProfile = async (userId: string) => {

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    const accessToken = await decryptToken(user.cipher, user.nonce);

    const response = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });

    const data = response.data;

    const profile = {
        identity: {
            username: data.login,
            name: data.name || data.login,
            avatar: data.avatar_url,
            githubUrl: data.html_url,
        },

        about: {
            bio: data.bio ?? null,
            location: data.location ?? null,
            company: data.company ?? null,
            email: data.email ?? null,
            type: data.type,
            hireable: data.hireable ?? false,
        },

        stats: {
            followers: data.followers,
            following: data.following,
            publicRepos: data.public_repos,
            publicGists: data.public_gists,
        },

        meta: {
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        },
    };

    return profile;
}