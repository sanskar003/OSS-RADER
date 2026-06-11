import { create } from "zustand"

type RepoStateFilter = {
    page: number,
    limit: number,
    language?: string,
    topic?: string,
    sort: "stars" | "forks" | "updated",
    minStars?: number

    setFilters: (data: Partial<RepoStateFilter>) => void;
    setPage: (page: number) => void;
    reset: () => void;
}

export const useRepo = create<RepoStateFilter>((set) => ({
    page: 1,
    limit: 20,
    sort: "stars",

    setFilters: (data) =>
        set((state) => ({
            ...state, ...data, page: 1
        })),

    setPage: (page) => set({ page }),

    reset: () =>
        set({
            page: 1,
            limit: 20,
            sort: "stars",
            language: undefined,
            topic: undefined,
            minStars: undefined,
        })
}))