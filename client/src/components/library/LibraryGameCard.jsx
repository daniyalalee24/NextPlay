import { Link } from "react-router-dom";

const statuses = ["Want to Play", "Playing", "Completed"];
const select =
  "mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-2.5 py-2 text-sm text-white outline-none transition focus:border-indigo-500";

export default function LibraryGameCard({ game, onUpdate, onRemove }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-950/40">
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        <Link
          to={`/games/${game.gameId}`}
          aria-label={`View details for ${game.title}`}
          className="block h-full"
        >
          {game.cover ? (
            <img
              src={game.cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        </Link>

        <button
          type="button"
          onClick={() => onUpdate(game._id, { favorite: !game.favorite })}
          aria-pressed={game.favorite}
          aria-label={
            game.favorite ? "Remove from favorites" : "Add to favorites"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 backdrop-blur-sm transition hover:scale-105 ${
            game.favorite
              ? "bg-pink-500/30 text-pink-300"
              : "bg-gray-950/70 text-gray-300 hover:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={game.favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 8 2.7c0 6.1-8 11-8 11Z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link
          to={`/games/${game.gameId}`}
          className="line-clamp-1 font-semibold transition-colors hover:text-indigo-300"
        >
          {game.title}
        </Link>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-300"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-400">
            Status
            <select
              value={game.status}
              onChange={(e) => onUpdate(game._id, { status: e.target.value })}
              className={select}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="text-xs text-gray-400">
            Your rating
            <select
              value={game.rating ?? ""}
              onChange={(e) =>
                onUpdate(game._id, {
                  rating: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className={select}
            >
              <option value="">Not rated</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} / 5
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={() => onRemove(game._id)}
          className="mt-auto self-start pt-4 text-sm font-medium text-gray-500 transition hover:text-red-400"
        >
          Remove
        </button>
      </div>
    </article>
  );
}
