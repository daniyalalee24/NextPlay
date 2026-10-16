import LibraryGameCard from "./LibraryGameCard";

export default function LibraryGameList({
  games,
  totalGames,
  onUpdate,
  onRemove,
  onReset,
}) {
  if (!games.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 px-6 py-14 text-center">
        <h2 className="text-lg font-semibold">No games match these filters</h2>
        <p className="mt-2 text-sm text-gray-400">
          Try changing your filters or resetting them.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
