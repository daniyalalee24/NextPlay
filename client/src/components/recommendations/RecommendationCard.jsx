import { Link } from "react-router-dom";

export default function RecommendationCard({ game, index }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 transition hover:border-indigo-500/30">
      <div className="flex flex-col sm:flex-row">
        {game.cover ? (
          <img
            src={game.cover}
            alt={game.title}
            loading="lazy"
            className="h-48 w-full object-cover sm:h-auto sm:min-h-52 sm:w-36 lg:w-44"
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center bg-gray-800 text-sm text-gray-500 sm:min-h-52 sm:w-36 lg:w-44">
            No cover available
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wider text-gray-500">
                MATCH #{index + 1}
              </p>

              <h3 className="mt-1 break-words text-xl font-bold leading-snug group-hover:text-indigo-300 sm:text-2xl">
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
                  className="rounded-full border border-gray-700/80 bg-gray-800 px-2.5 py-1 text-xs text-gray-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-xl border border-gray-800 bg-gray-950/70 p-4">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <span className="text-emerald-400" aria-hidden="true">
                ✓
              </span>
              Why this game?
            </h4>

            {game.reasons?.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {game.reasons.map((reason, reasonIndex) => (
                  <li
                    key={`${game.gameId}-${reasonIndex}`}
                    className="flex items-start gap-2 text-sm leading-5 text-gray-300"
                  >
                    <span
                      className="mt-0.5 text-emerald-400"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                This game matches your selected preferences.
              </p>
            )}
          </div>

          <div className="mt-5">
            <Link
              to={`/games/${game.gameId}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:gap-3 hover:text-indigo-300"
            >
              View Game Details
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
