import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  const year = game.released?.slice(0, 4);

  return (
    <Link
      to={`/games/${game.id}`}
      aria-label={`View details for ${game.name}`}
      className="group block rounded-2xl transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <article className="h-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition duration-300 group-hover:border-indigo-500/50 group-hover:shadow-lg group-hover:shadow-indigo-950/40">
        <div className="relative aspect-video overflow-hidden bg-gray-800">
          {game.background_image ? (
            <img
              src={game.background_image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

          {game.rating > 0 && (
            <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-gray-950/70 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-sm">
              ★ {Number(game.rating).toFixed(1)}
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="line-clamp-1 font-semibold transition-colors group-hover:text-indigo-300">
            {game.name}
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {year || "Release date unknown"}
          </p>
          <p className="mt-4 text-sm font-medium text-indigo-400">
            View details{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
