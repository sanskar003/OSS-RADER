export default function ReposSkeleton() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-56 bg-gray-100 dark:bg-zinc-900 rounded mt-2" />
        </div>

        <div className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full" />
      </div>

      <div className="grid gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 dark:bg-zinc-900 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}