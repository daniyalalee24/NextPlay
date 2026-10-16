const suggestions = [
  "The Witcher 3",
  "Elden Ring",
  "Resident Evil",
  "Forza Horizon 5",
];

export default function GameSearch({
  query,
  onQueryChange,
  onSearch,
  loading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="mb-10 rounded-2xl border border-gray-800 bg-gray-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search games, franchises, or titles..."
            aria-label="Search games"
            autoComplete="off"
            className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-base"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-32"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium text-gray-500">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            disabled={loading}
            onClick={() => onSearch(s)}
            className="rounded-full border border-gray-700 bg-gray-800/70 px-3 py-1.5 text-xs text-gray-300 transition hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </section>
  );
}
