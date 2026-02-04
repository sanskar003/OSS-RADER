interface RepoCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export function RepoCard({
  name,
  description,
  stars,
  forks,
  language,
  url,
}: RepoCardProps) {
  return (
    <div
      className="
        backdrop-blur-xl bg-white/10 
        border border-white/20 
        rounded-2xl p-5 
        shadow-lg 
        hover:shadow-2xl 
        hover:bg-white/20 
        transition-all duration-300 
        cursor-pointer
      "
    >
      <a
        href={url}
        target="_blank"
        className="text-xl font-semibold text-blue-300 hover:text-blue-200 transition"
      >
        {name}
      </a>

      <p className="text-sm text-gray-300 mt-2 line-clamp-2">{description}</p>

      <div className="flex items-center gap-4 text-gray-200 text-sm mt-4">
        <span className="flex items-center gap-1">⭐ {stars}</span>

        <span className="flex items-center gap-1">🍴 {forks}</span>

        <span className="px-2 py-1 bg-white/10 rounded-lg text-xs border border-white/20">
          {language || "Unknown"}
        </span>
      </div>
    </div>
  );
}
