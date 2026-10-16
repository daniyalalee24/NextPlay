import { Link } from "react-router-dom";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationResults({
  recommendations,
  loading,
  error,
  hasSearched,
  source,
}) {
  if (loading) {
    return (
      <section className="space-y-4" role="status" aria-live="polite">
        <div className="animate-pulse rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="h-5 w-44 rounded bg-gray-800" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-800" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4"
          >
            <div className="flex gap-4">
              <div className="h-28 w-24 shrink-0 rounded-lg bg-gray-800 sm:h-36 sm:w-32" />

              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 w-3/4 rounded bg-gray-800" />
                <div className="h-3 w-1/2 rounded bg-gray-800" />
                <div className="h-3 w-full rounded bg-gray-800" />
                <div className="h-3 w-4/5 rounded bg-gray-800" />
              </div>
            </div>
          </div>
        ))}

        <p className="text-center text-sm text-gray-500">
          Finding games that fit your preferences...
        </p>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (!hasSearched) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/30 px-6 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-3xl text-indigo-300">
          ✳
        </div>

        <h2 className="mt-5 text-xl font-bold">Your next game awaits</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          Choose your favorite genres, set your available time, and let NextPlay
          find your next adventure.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <span className="rounded-full border border-gray-800 px-3 py-1.5">
            Genre matches
          </span>
          <span className="rounded-full border border-gray-800 px-3 py-1.5">
            Match scores
          </span>
          <span className="rounded-full border border-gray-800 px-3 py-1.5">
            Explanations
          </span>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/50 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-2xl text-gray-400">
          ?
        </div>

        <h2 className="mt-5 text-xl font-bold">No matches this time</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
          Try selecting more genres, choosing a different session length, or
          switching your recommendation source.
        </p>

        {source === "backlog" && (
          <Link
            to="/games"
            className="mt-5 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Explore games to build your backlog →
          </Link>
        )}
      </section>
    );
  }

  return (
    <section className="min-w-0">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wider text-indigo-400">
            YOUR RESULTS
          </p>
          <h2 className="mt-1 text-2xl font-bold">Recommended for you</h2>
        </div>

        <span className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1.5 text-sm text-gray-400">
          {recommendations.length}{" "}
          {recommendations.length === 1 ? "match" : "matches"}
        </span>
      </div>

      <div className="space-y-5">
        {recommendations.map((game, index) => (
          <RecommendationCard key={game.gameId} game={game} index={index} />
        ))}
      </div>
    </section>
  );
}
