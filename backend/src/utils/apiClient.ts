import axios from "axios"

export const githubClient = axios.create({
    baseURL: "https://api.github.com",
    // headers:{
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    // },
});