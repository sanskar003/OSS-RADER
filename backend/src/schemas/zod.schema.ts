import { z } from "zod"

export const repoQuerySchema = z.object({
    page: z.coerce.number().min(1).default(20),
    limit: z.coerce.number().min(1).max(50).default(20),

    language: z.string().optional(),
    topic: z.string().optional(),

    sort: z.enum(["stars", "forks", "updated"]).default("stars"),

    minStars: z.coerce.number().min(0).optional(),
});

export type RepoQuery = z.infer<typeof repoQuerySchema>;