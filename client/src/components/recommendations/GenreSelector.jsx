const genres = [
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Puzzle",
  "Strategy",
  "Indie",
  "Platformer",
  "Racing",
  "Sports",
];

export default function GenreSelector({ selectedGenres, onToggle }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 font-semibold text-gray-200">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-300">
            1
          </span>
          Pick your genres
        </h3>
        <span className="rounded-full border border-gray-800 bg-gray-900 px-2.5 py-0.5 text-xs text-gray-400">
          {selectedGenres.length} selected
        </span>
      </div>

      <p className="mb-4 mt-2 text-sm text-gray-500">
        Choose the types of games you enjoy.
      </p>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const selected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(genre)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selected
                  ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-300"
                  : "border-gray-700 bg-gray-800/70 text-gray-400 hover:border-indigo-500/60 hover:text-white"
              }`}
            >
              {selected && (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
                </svg>
              )}
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
}
