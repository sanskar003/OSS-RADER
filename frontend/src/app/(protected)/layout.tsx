"use client"

import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user)
    const isLoading = useAuthStore((state) => state.isLoading)

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/login")
        }
    }, [isLoading, user, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Checking authentication...
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return children;
}