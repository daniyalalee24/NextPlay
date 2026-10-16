import GameCard from "./GameCard";
import LoadingSkeleton from "../common/LoadingSkeleton";

const icons = {
  game: "M6 11h4M8 9v4M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.6 7A2.6 2.6 0 0 0 5.9 17.6L8 15h8l2.1 2.6a2.6 2.6 0 0 0 4.7-2.5l-1.6-7A4 4 0 0 0 17.3 5Z",
  search: "m20 20-3.5-3.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
};

function EmptyState({ icon, title, text, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d={icons[icon]} />
        </svg>
      </div>
      <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">{text}</p>
      {action}
    </div>
  );
}

export default function GameSearchResults({
  games,
  loading,
  hasSearched,
  searchedQuery,
  onClearSearch,
}) {
  if (loading) return <LoadingSkeleton count={8} />;

  if (!hasSearched) {
    return (
      <EmptyState
        icon="game"
        title="Find your next game"
        text="Search for a game to explore its details and discover something new."
      />
    );
  }

  if (!games.length) {
    return (
      <EmptyState
        icon="search"
        title="No games found"
        text={`We couldn't find any results for "${searchedQuery}". Try another title.`}
        action={
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Clear search
          </button>
        }
      />
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
          Results for "{searchedQuery}"
        </h2>
        <span className="shrink-0 rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs text-gray-400">
          {games.length} {games.length === 1 ? "game" : "games"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
