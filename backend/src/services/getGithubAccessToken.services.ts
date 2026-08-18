import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model"

export const getGithubAccesstoken = async (userId: string) => {
    const user = await User.findById(userId).select("cipher nonce");

    if (!user) throw new Error("User not found");

    if (!user.cipher || !user.nonce) throw new Error("GitHub access token not available");


    return decryptToken(user?.cipher, user?.nonce)
}