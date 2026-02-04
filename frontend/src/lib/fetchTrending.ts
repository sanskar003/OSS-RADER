import { apiFetch } from "@/services/api";


export async function fetchTrendingRepos(){
    return apiFetch("/trending");
}