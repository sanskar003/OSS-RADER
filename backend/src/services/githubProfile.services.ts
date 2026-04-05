import axios from "axios";
import { decryptToken } from "../config/crypto";
import { User } from "../models/User.model";

export  const getGithubProfile = async (githubId: number) => {

    const user = await User.findOne({ githubId });
    if (!user) throw new Error("User not found");

    const accessToken = await decryptToken(user.cipher, user.nonce);
    
    const response = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });
    return response.data;
}