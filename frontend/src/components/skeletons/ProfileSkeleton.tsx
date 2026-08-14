export default function ProfileSkeletons(){
    return (
    <div className="p-6 max-w-xl mx-auto space-y-6 animate-pulse">
      <div className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full ml-auto" />

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-zinc-800" />

        <div className="space-y-2 flex-1">
          <div className="h-6 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="h-32 bg-gray-100 dark:bg-zinc-900 rounded-2xl" />

      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 bg-gray-50 dark:bg-zinc-900/50 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}