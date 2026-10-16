import { Link } from "react-router-dom";

export default function RecommendationCard({ game, index }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-950/40">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 shrink-0 overflow-hidden bg-gray-800 sm:h-auto sm:min-h-52 sm:w-36 lg:w-44">
          {game.cover ? (
            <img
              src={game.cover}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No cover available
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wider text-gray-500">
                MATCH #{index + 1}
              </p>
              <h3 className="mt-1 break-words text-xl font-bold leading-snug transition-colors group-hover:text-indigo-300 sm:text-2xl">
                {game.title}
              </h3>
            </div>

            <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center">
              <p className="text-lg font-bold leading-tight text-emerald-400">
                {game.score}
                <span className="text-xs font-medium text-emerald-400/70">
                  /100
                </span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">
                Match score
              </p>
            </div>
          </div>

          {game.genres?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-xl border border-gray-800 bg-gray-950/70 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Why this game?
            </h4>

            {game.reasons?.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {game.reasons.map((reason, i) => (
                  <li
                    key={`${game.gameId}-${i}`}
                    className="flex items-start gap-2 text-sm leading-5 text-gray-300"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    >
                      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
                    </svg>
                    {reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                This game matches your selected preferences.
              </p>
            )}
          </div>

          {/* The ::after makes the whole card clickable */}
          <Link
            to={`/games/${game.gameId}`}
            className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-indigo-400 transition-colors after:absolute after:inset-0 hover:text-indigo-300 focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-indigo-400"
          >
            View Game Details
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
