import { useState } from "react";
import api from "../services/api";
import GameCard from "../components/games/GameCard";
import LoadingSkeleton from "../components/common/LoadingSkeleton";

export default function Games() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await api.get("/api/games/search", {
        params: {
          query: query.trim(),
        },
      });

      setGames(response.data.results || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load games. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">Discover Games</h1>
        <p className="mb-8 text-gray-400">
          Search thousands of titles across all platforms.
        </p>

        <form onSubmit={handleSearch} className="mb-10 flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games (e.g. Witcher, Tekken, Resident Evil)..."
            aria-label="Search games"
            className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3.5 outline-none transition-colors focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-lg bg-red-950 p-4 text-red-300"
          >
            {error}
          </p>
        )}

        {/* Initial Search Prompt State */}
        {!hasSearched && !loading && (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center text-gray-400">
            <p className="text-lg font-medium text-gray-300">
              Type a game title above to start exploring.
            </p>
            <p className="mt-1 text-sm">
              Find releases, genre info, and save games directly to your
              library.
            </p>
          </div>
        )}

        {/* Animated Loading Skeletons */}
        {loading && <LoadingSkeleton count={8} />}

        {/* Empty Search Results State */}
        {hasSearched && !loading && games.length === 0 && !error && (
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center text-gray-400">
            <p className="text-lg font-semibold text-gray-300">
              No games found for "{query}"
            </p>
            <p className="mt-1 text-sm">
              Try checking your spelling or searching for a different game.
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && games.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
