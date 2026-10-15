export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
        >
          <div className="h-48 w-full bg-gray-800" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 rounded bg-gray-800" />
            <div className="h-4 w-1/2 rounded bg-gray-800" />
            <div className="h-4 w-1/3 rounded bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
