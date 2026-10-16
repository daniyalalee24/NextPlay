const statuses = ["All", "Want to Play", "Playing", "Completed"];

export default function LibraryFilters({ filters, onChange, genres, onReset }) {
  const { status, genre, favoritesOnly } = filters;
  const isFiltered = status !== "All" || genre !== "All" || favoritesOnly;

  return (
    <section className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/70 p-4 shadow-xl shadow-black/20 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-2"
        >
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ status: s })}
              aria-pressed={status === s}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                status === s
                  ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-300"
                  : "border-gray-700 bg-gray-800/70 text-gray-300 hover:border-indigo-500/60 hover:text-indigo-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={genre}
          onChange={(e) => onChange({ genre: e.target.value })}
          aria-label="Filter by genre"
          className="rounded-xl border border-gray-700 bg-gray-950 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:w-60"
        >
          <option value="All">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onChange({ favoritesOnly: !favoritesOnly })}
          aria-pressed={favoritesOnly}
          className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
            favoritesOnly
              ? "border-pink-400/40 bg-pink-500/15 text-pink-300"
              : "border-gray-700 bg-gray-950 text-gray-300 hover:border-gray-600"
          }`}
        >
          Favorites only
        </button>
      </div>
    </section>
  );
}
