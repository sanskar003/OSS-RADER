import axios from "axios";
import { handleGithubAuth } from "./auth.services";
import { generateToken } from "../utils/jwt";

export const handleGithubCallback = async (code: string) => {
  try {
    if (!code) {
      throw new Error("Authorization code is required");
    }

    //EXCHANGE CODE -> ACESS TOKEN
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.BACK_GITHUB_CLIENT_ID,
        client_secret: process.env.BACK_GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    const accessToken = tokenResponse.data?.access_token;

    if (!accessToken) {
      throw new Error("Failed to get GitHub access token");
    }

    //FETCH GITHUB USER PROFILE
    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubProfile = profileResponse.data;

    //FETCH EMAIL ( optional fallback )
    let email = githubProfile.email;

    if (!email) {
      try {
        const emailResponse = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        email =
          emailResponse.data.find((e: any) => e.primary && e.verified)?.email ||
          null;
      } catch {
        email = null;
      }
    }

    //SAVE USER
    const user = await handleGithubAuth({
        accessToken,
          profile: {
        id: githubProfile.id,
        login: githubProfile.login,
        name: githubProfile.name,
        email,
        avatar_url: githubProfile.avatar_url,
      },
    })

    //CREATE JWT TOKEN
    const token = generateToken(user._id.toString())

    return { user, token };
  } catch (error) {
    console.error("Error in handleGithubLogin:", error);
    throw error;
  }
};
