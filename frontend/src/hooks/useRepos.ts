import { fetchRepo } from "@/lib/api/github";
import { useRepo } from "@/store/repo.store";
import { useQuery } from "@tanstack/react-query";

export const useRepos = () => {
    const page = useRepo((state) => state.page);
    const limit = useRepo((state) => state.limit);
    const language = useRepo((state) => state.language);
    const topic = useRepo((state) => state.topic);
    const sort = useRepo((state) => state.sort);
    const minStars = useRepo((state) => state.minStars);

    return useQuery({
        queryKey: [
           "repo",
            page,
            limit,
            language,
            topic,
            sort,
            minStars,
        ],
        queryFn: () =>
            fetchRepo({
                page,
                limit,
                language,
                topic,
                sort,
                minStars,
            }),
    });
};