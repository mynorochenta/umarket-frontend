export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-2/5" />
        <div className="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-700">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
