import { Link } from "react-router-dom";
import RecommendationCard from "./RecommendationCard";

const icons = {
  spark:
    "M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4",
  search: "m20 20-3.5-3.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
};

function Panel({ icon, title, text, children }) {
  return (
    <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
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
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">{text}</p>
      {children}
    </section>
  );
}

export default function RecommendationResults({
  recommendations,
  loading,
  error,
  hasSearched,
  source,
}) {
  if (loading) {
    return (
      <section className="space-y-5" role="status" aria-live="polite">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex animate-pulse gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-4"
          >
            <div className="h-36 w-28 shrink-0 rounded-lg bg-gray-800 sm:w-36" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-3/4 rounded bg-gray-800" />
              <div className="h-3 w-1/2 rounded bg-gray-800" />
              <div className="h-3 w-full rounded bg-gray-800" />
              <div className="h-3 w-4/5 rounded bg-gray-800" />
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-gray-500">
          Finding games that fit your preferences...
        </p>
      </section>
    );
  }

  if (!hasSearched || error) {
    return (
      <Panel
        icon="spark"
        title="Your next game awaits"
        text="Choose your favorite genres, set your available time, and let NextPlay find your next adventure."
      >
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-gray-400">
          {["Genre matches", "Match scores", "Explanations"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-800 px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </Panel>
    );
  }

  if (!recommendations.length) {
    return (
      <Panel
        icon="search"
        title="No matches this time"
        text="Try selecting more genres, choosing a different session length, or switching your recommendation source."
      >
        {source === "backlog" && (
          <Link
            to="/games"
            className="mt-5 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            Explore games to build your backlog →
          </Link>
        )}
      </Panel>
    );
  }

  return (
    <section className="min-w-0">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
            YOUR RESULTS
          </p>
          <h2 className="mt-1 text-2xl font-bold">Recommended for you</h2>
        </div>
        <span className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs text-gray-400">
          {recommendations.length}{" "}
          {recommendations.length === 1 ? "match" : "matches"}
        </span>
      </div>

      <div className="space-y-5">
        {recommendations.map((game, i) => (
          <RecommendationCard key={game.gameId} game={game} index={i} />
        ))}
      </div>
    </section>
  );
}
