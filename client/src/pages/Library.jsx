import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import LibraryFilters from "../components/library/LibraryFilters";
import LibraryGameList from "../components/library/LibraryGameList";
import LoadingSkeleton from "../components/common/LoadingSkeleton";

const defaultFilters = { status: "All", genre: "All", favoritesOnly: false };

export default function Library() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(defaultFilters);

  const fetchLibrary = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/api/library");
      setGames(data.games);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load your library. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  // Runs a request, clears the old error, and reports a friendly one on failure
  const run = async (task, fallback) => {
    setError("");
    try {
      return await task();
    } catch (err) {
      setError(err.response?.data?.message || fallback);
    }
  };

  const updateGame = async (id, updates) => {
    const res = await run(
      () => api.patch(`/api/library/${id}`, updates),
      "Could not update the game. Please try again.",
    );
    if (res)
      setGames((all) => all.map((g) => (g._id === id ? res.data.game : g)));
  };

  const removeGame = async (id) => {
    const res = await run(
      () => api.delete(`/api/library/${id}`),
      "Could not remove the game. Please try again.",
    );
    if (res) setGames((all) => all.filter((g) => g._id !== id));
  };

  const genres = useMemo(
    () => [...new Set(games.flatMap((g) => g.genres || []))].sort(),
    [games],
  );

  const filteredGames = useMemo(
    () =>
      games.filter(
        (g) =>
          (filters.status === "All" || g.status === filters.status) &&
          (filters.genre === "All" || g.genres?.includes(filters.genre)) &&
          (!filters.favoritesOnly || g.favorite),
      ),
    [games, filters],
  );

  const updateFilters = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const resetFilters = () => setFilters(defaultFilters);
  const isEmpty = !loading && games.length === 0;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <header className="mb-9">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
            WELCOME BACK, {(user?.name || "Gamer").toUpperCase()}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              Library
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Keep track of what you want to play, what you're playing, and what
            you've finished.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-col gap-3 rounded-xl border border-red-900/60 bg-red-950/40 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-red-300">{error}</p>
            {isEmpty && (
              <button
                type="button"
                onClick={fetchLibrary}
                className="shrink-0 rounded-lg border border-red-800 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-900/50"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {loading && <LoadingSkeleton count={8} />}

        {isEmpty && !error && (
          <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 px-6 py-14 text-center">
            <h2 className="text-xl font-semibold">Your library is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
              Find a game you like and add it to your library.
            </p>
            <Link
              to="/games"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              Explore Games
            </Link>
          </div>
        )}

        {!loading && games.length > 0 && (
          <>
            <LibraryFilters
              filters={filters}
              onChange={updateFilters}
              genres={genres}
              onReset={resetFilters}
            />
            <LibraryGameList
              games={filteredGames}
              totalGames={games.length}
              onUpdate={updateGame}
              onRemove={removeGame}
              onReset={resetFilters}
            />
          </>
        )}
      </div>
    </main>
  );
}
