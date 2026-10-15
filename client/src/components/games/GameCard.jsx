import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <Link
      to={`/games/${game.id}`}
      aria-label={`View details for ${game.name}`}
      className="group block rounded-xl transition duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <article className="h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-colors group-hover:border-indigo-500">
        {game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gray-800 text-gray-400">
            No image available
          </div>
        )}

        <div className="p-4">
          <h2 className="font-semibold transition-colors group-hover:text-indigo-400">
            {game.name}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Released: {game.released || "Unknown"}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Rating: {game.rating ? `${game.rating} / 5` : "Not rated"}
          </p>

          <p className="mt-4 text-sm font-medium text-indigo-400">
            View details →
          </p>
        </div>
      </article>
    </Link>
  );
}
