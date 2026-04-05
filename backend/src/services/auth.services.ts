// services/auth.services.ts
import { User } from "../models/User.model";
import { encryptToken } from "../config/crypto";

interface GithubLoginPayload {
  accessToken: string;
  profile: {
    id: number;
    login: string;          // GitHub username
    name?: string;          // Display name
    email?: string;
    avatar_url?: string;
  };
}

export async function handleGithubLogin({ accessToken, profile }: GithubLoginPayload) {
  try {
    if (!accessToken) throw new Error("Access token is required");
    if (!profile?.id || !profile?.login) throw new Error("Profile id/login is required");

    //Encrypt the token before saving 
    const { cipher, nonce } = await encryptToken(accessToken);

    const user = await User.findOneAndUpdate(
      { githubId: profile.id },
      {
        githubId: profile.id,
        login: profile.login,
        name: profile.name,
        email: profile.email,
        avatarUrl: profile.avatar_url,
        cipher, //ENCRYPT TOKEN
        nonce,               //STORE NONCE 
        lastSyncedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return user;
  } catch (error) {
    console.error("Error in handleGithubLogin:", error);
    throw error;
  }
}