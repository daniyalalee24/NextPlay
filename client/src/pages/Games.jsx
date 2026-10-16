import { useState } from "react";
import api from "../services/api";
import GameSearch from "../components/games/GameSearch";
import GameSearchResults from "../components/games/GameSearchResults";

export default function Games() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchGames = async (term) => {
    const q = term.trim();
    if (!q || loading) return;

    setQuery(q);
    setSearchedQuery(q);
    setLoading(true);
    setError("");
    setGames([]);
    setHasSearched(true);

    try {
      const { data } = await api.get("/api/games/search", {
        params: { query: q },
      });
      setGames(data.results || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load games. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchedQuery("");
    setGames([]);
    setError("");
    setHasSearched(false);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <header className="mb-9">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
            YOUR NEXT ADVENTURE STARTS HERE
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Discover{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              Games
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Explore thousands of games, discover your next favorite, and build
            your personal gaming library.
          </p>
        </header>

        <GameSearch
          query={query}
          onQueryChange={setQuery}
          onSearch={searchGames}
          loading={loading}
        />

        {error ? (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-red-900/60 bg-red-950/40 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-semibold text-red-300">
                Something went wrong
              </h2>
              <p className="mt-1 text-sm text-red-200/80">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => searchGames(searchedQuery)}
              disabled={loading}
              className="shrink-0 rounded-lg border border-red-800 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-900/50 disabled:opacity-50"
            >
              Try again
            </button>
          </div>
        ) : (
          <GameSearchResults
            games={games}
            loading={loading}
            hasSearched={hasSearched}
            searchedQuery={searchedQuery}
            onClearSearch={clearSearch}
          />
        )}
      </div>
    </main>
  );
}
