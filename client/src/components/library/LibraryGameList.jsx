import LibraryGameCard from "./LibraryGameCard";

export default function LibraryGameList({
  games,
  totalGames,
  onUpdate,
  onRemove,
  onReset,
}) {
  if (games.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-12 text-center">
        <h2 className="text-xl font-semibold">No games match these filters</h2>

        <p className="mt-2 text-gray-400">
          Try changing your filters or resetting them.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5 text-sm text-gray-400">
        Showing {games.length} of {totalGames}{" "}
        {totalGames === 1 ? "game" : "games"}
      </p>

      {/* Changed to sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 for consistency */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <LibraryGameCard
            key={game._id}
            game={game}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  );
}
