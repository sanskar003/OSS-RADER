"use client"

import { useRepos } from "@/hooks/useRepos";
import { useRepo } from "@/store/repo.store";

export default function Repos() {
    const { data, isLoading, isError } = useRepos();
    const { setFilters, setPage } = useRepo();


    if (isLoading) {
        return <div>Loading repositories...</div>;
    }

    if (isError || !data) {
        return <div>Failed to load repositories</div>;
    }

    return (
        <div>

            {/* Filters */}
            <select
                onChange={(e) =>
                    setFilters({ language: e.target.value })
                }
            >
                <option value="">All</option>
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
            </select>

            <select
                onChange={(e) =>
                    setFilters({
                        sort: e.target.value as any,
                    })
                }
            >
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Updated</option>
            </select>

            {/* States */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}

            {/* Repo list */}
            <div>
                {data?.data?.map((repo: any) => (
                    <div key={repo.id}>
                        <h3>{repo.name}</h3>
                        <p>{repo.description}</p>
                        <p>⭐ {repo.stars}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div>
                <button
                    onClick={() =>
                        setPage(data.pagination.page - 1)
                    }
                    disabled={data.pagination.page === 1}
                >
                    Prev
                </button>

                <span>{data.pagination.page}</span>

                <button
                    onClick={() =>
                        setPage(data.pagination.page + 1)
                    }
                    disabled={!data.pagination.hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    )
}