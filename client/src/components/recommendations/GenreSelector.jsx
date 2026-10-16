const availableGenres = [
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
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-200">1. Pick your genres</h3>

        <span className="text-xs text-gray-500">
          {selectedGenres.length} selected
        </span>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Choose the types of games you enjoy.
      </p>

      <div className="flex flex-wrap gap-2">
        {availableGenres.map((genre) => {
          const selected = selectedGenres.includes(genre);

          return (
            <button
              key={genre}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(genre)}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                selected
                  ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                  : "border-gray-700 bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {selected ? "✓ " : ""}
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
}
