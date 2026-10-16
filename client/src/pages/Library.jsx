import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import LibraryFilters from "../components/library/LibraryFilters";
import LibraryGameList from "../components/library/LibraryGameList";

export default function Library() {
  const { user } = useAuth();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [genreFilter, setGenreFilter] = useState("All");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/library");
        setGames(response.data.games);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Could not load your library. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const genres = useMemo(() => {
    return [...new Set(games.flatMap((game) => game.genres || []))].sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesStatus =
        statusFilter === "All" || game.status === statusFilter;

      const matchesFavorite = !favoritesOnly || game.favorite;

      const matchesGenre =
        genreFilter === "All" || game.genres?.includes(genreFilter);

      return matchesStatus && matchesFavorite && matchesGenre;
    });
  }, [games, statusFilter, favoritesOnly, genreFilter]);

  const resetFilters = () => {
    setStatusFilter("All");
    setFavoritesOnly(false);
    setGenreFilter("All");
  };

  const updateGame = async (gameId, updates) => {
    try {
      setError("");

      const response = await api.patch(`/api/library/${gameId}`, updates);

      setGames((currentGames) =>
        currentGames.map((game) =>
          game._id === gameId ? response.data.game : game,
        ),
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not update the game. Please try again.",
      );
    }
  };

  const removeGame = async (gameId) => {
    try {
      setError("");

      await api.delete(`/api/library/${gameId}`);

      setGames((currentGames) =>
        currentGames.filter((game) => game._id !== gameId),
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not remove the game. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">My Library</h1>

          <p className="mt-2 text-gray-400">
            Welcome, {user?.name || "Gamer"}! Keep track of your games.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-col gap-3 rounded-lg border border-red-900/60 bg-red-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-red-300">{error}</p>

            {!loading && games.length === 0 && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="shrink-0 rounded-lg border border-red-800 px-4 py-2 text-sm text-red-200 hover:bg-red-900/50"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {loading ? (
          <p className="py-8 text-center text-gray-400">
            Loading your library...
          </p>
        ) : games.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">Your library is empty</h2>

            <p className="mt-2 text-gray-400">
              Find a game you like and add it to your library.
            </p>

            <Link
              to="/games"
              className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
            >
              Explore Games
            </Link>
          </div>
        ) : (
          <>
            <LibraryFilters
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              genreFilter={genreFilter}
              onGenreChange={setGenreFilter}
              genres={genres}
              favoritesOnly={favoritesOnly}
              onFavoritesChange={setFavoritesOnly}
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
