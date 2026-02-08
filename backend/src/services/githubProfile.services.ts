import axios from "axios";

export  const getGithubProfile = async (accessToken: string) => {
    const response = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });
    return response.data;
}