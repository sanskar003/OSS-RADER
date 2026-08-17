import axios from "axios";
import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model"
import { Starred } from "../models/Starred.model";

export const getGithubStarred = async (userId: string) => {

    const user = await User.findById(userId)

    if (!user) throw new Error("User not found");

    const accessToken = await decryptToken(user.cipher, user.nonce)

    const response = await axios.get("https://api.github.com/user/starred", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
        }
    })

    const repos = response.data;

    //TRANSFORM + UPSERT
    const bulkOps = repos.map((repo: any) => ({
        updateOne: {
            filter: {
                userId: user._id,
                repoId: repo.id,
            },
            update: {
                $set: {
                    userId: user._id,
                    repoId: repo.id,

                    name: repo.name,
                    fullName: repo.full_name,
                    description: repo.description,

                    stars: repo.stargazers_count,
                    forks: repo.forks_count,

                    language: repo.language,
                    languages: {},
                    topics: repo.topics || [],

                    isPrivate: repo.private,
                    htmlUrl: repo.html_url,

                    pushedAt: repo.pushed_at,
                },
            },
            upsert: true,
        },
    }));

    //WRITE TO DB
    if (bulkOps.length) {
        await Starred.bulkWrite(bulkOps);
    }

    //RETURN FROM DB
    return await Starred.find({ userId: user._id }).lean();

}