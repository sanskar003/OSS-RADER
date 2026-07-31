import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
    const queryClient = useQueryClient();
    const logoutStore = useAuthStore((state) => state.logout)

    return useMutation({
        mutationFn: async () => {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            const response = await fetch("https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            if(!response.ok){
                throw new Error("Login failed")
            }

            return response.json()
        },

        onSuccess: () => {
            logoutStore()
            queryClient.clear()
        }
    })
}