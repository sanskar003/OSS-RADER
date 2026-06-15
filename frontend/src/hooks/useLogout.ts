import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
    const queryClient = useQueryClient();
    const logoutStore = useAuthStore((state) => state.logout)

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
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