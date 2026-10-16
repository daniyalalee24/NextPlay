import { Link } from "react-router-dom";

const statuses = ["Want to Play", "Playing", "Completed"];

export default function LibraryGameCard({ game, onUpdate, onRemove }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
      <Link to={`/games/${game.gameId}`}>
        {game.cover ? (
          <img
            src={game.cover}
            alt={game.title}
            loading="lazy"
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gray-800 text-gray-400">
            No image available
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link
          to={`/games/${game.gameId}`}
          className="font-semibold hover:text-indigo-400 line-clamp-1"
        >
          {game.title}
        </Link>

        <div className="mt-3 flex flex-wrap gap-2">
          {game.genres?.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
            >
              {genre}
            </span>
          ))}
        </div>

        <label
          htmlFor={`status-${game._id}`}
          className="mt-4 block text-sm text-gray-400"
        >
          Status
        </label>

        <select
          id={`status-${game._id}`}
          value={game.status}
          onChange={(event) =>
            onUpdate(game._id, { status: event.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <label
          htmlFor={`rating-${game._id}`}
          className="mt-4 block text-sm text-gray-400"
        >
          Your rating
        </label>

        <select
          id={`rating-${game._id}`}
          value={game.rating ?? ""}
          onChange={(event) =>
            onUpdate(game._id, {
              rating:
                event.target.value === "" ? null : Number(event.target.value),
            })
          }
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        >
          <option value="">Not rated</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} / 5
            </option>
          ))}
        </select>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onUpdate(game._id, { favorite: !game.favorite })}
            aria-pressed={game.favorite}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              game.favorite
                ? "bg-pink-500/15 text-pink-400"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {game.favorite ? "♥ Favorited" : "♡ Favorite"}
          </button>

          <button
            type="button"
            onClick={() => onRemove(game._id)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-950"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
