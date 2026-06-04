import { create } from "zustand";

export type User = {
    userId: string;
    githubId?: number;
    login?: string;
    name?: string;
    avatarUrl?: string;
    email?: string;
}

type AuthState = {
    user: User | null,
    isAuthenticated: boolean,

    setUser: (user: User) => void,
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true
        }),

    logout: () =>
        set({
            user: null,
            isAuthenticated: false
        })
}))