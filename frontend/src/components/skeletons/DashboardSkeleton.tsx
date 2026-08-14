export default function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-64 bg-gray-100 dark:bg-zinc-900 rounded mt-2" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-gray-100 dark:bg-zinc-900 rounded-2xl"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="h-72 bg-gray-100 dark:bg-zinc-900 rounded-2xl" />
        <div className="h-72 bg-gray-100 dark:bg-zinc-900 rounded-2xl" />
      </div>
    </div>
  );
}