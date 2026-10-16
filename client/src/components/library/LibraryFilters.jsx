const statuses = ["Want to Play", "Playing", "Completed"];

export default function LibraryFilters({
  statusFilter,
  onStatusChange,
  genreFilter,
  onGenreChange,
  genres,
  favoritesOnly,
  onFavoritesChange,
  onReset,
}) {
  return (
    <section className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Filter your games</h2>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Reset filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm text-gray-400"
          >
            Status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="genre-filter"
            className="mb-2 block text-sm text-gray-400"
          >
            Genre
          </label>

          <select
            id="genre-filter"
            value={genreFilter}
            onChange={(event) => onGenreChange(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option value="All">All genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => onFavoritesChange(event.target.checked)}
              className="h-4 w-4 accent-pink-500"
            />
            <span>Favorites only ♥</span>
          </label>
        </div>
      </div>
    </section>
  );
}
