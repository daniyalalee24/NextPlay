import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const statuses = ["Want to Play", "Playing", "Completed"];

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
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">My Library</h1>
          <p className="mt-2 text-gray-400">
            Welcome, {user?.name || "Gamer"}! Keep track of your games.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-lg bg-red-950 p-4 text-red-300"
          >
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-400">Loading your library...</p>
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
            {/* Filter Section */}
            <section className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Filter your games</h2>

                <button
                  onClick={resetFilters}
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
                    onChange={(event) => setStatusFilter(event.target.value)}
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
                    onChange={(event) => setGenreFilter(event.target.value)}
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
                      onChange={(event) =>
                        setFavoritesOnly(event.target.checked)
                      }
                      className="h-4 w-4 accent-pink-500"
                    />
                    <span>Favorites only ♥</span>
                  </label>
                </div>
              </div>
            </section>

            <p className="mb-5 text-sm text-gray-400">
              Showing {filteredGames.length} of {games.length}{" "}
              {games.length === 1 ? "game" : "games"}
            </p>

            {filteredGames.length === 0 ? (
              <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-12 text-center">
                <h2 className="text-xl font-semibold">
                  No games match these filters
                </h2>
                <p className="mt-2 text-gray-400">
                  Try changing your filters or resetting them.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <article
                    key={game._id}
                    className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
                  >
                    <Link to={`/games/${game.gameId}`}>
                      {game.cover ? (
                        <img
                          src={game.cover}
                          alt={game.title}
                          loading="lazy"
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-gray-800 text-gray-400">
                          No image available
                        </div>
                      )}
                    </Link>

                    <div className="p-4">
                      <Link
                        to={`/games/${game.gameId}`}
                        className="font-semibold hover:text-indigo-400"
                      >
                        {game.title}
                      </Link>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {game.genres?.map((genre) => (
                          <span
                            key={genre}
                            className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      <label className="mt-4 block text-sm text-gray-400">
                        Status
                      </label>
                      <select
                        value={game.status}
                        onChange={(event) =>
                          updateGame(game._id, {
                            status: event.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <label className="mt-4 block text-sm text-gray-400">
                        Your rating
                      </label>
                      <select
                        value={game.rating ?? ""}
                        onChange={(event) =>
                          updateGame(game._id, {
                            rating:
                              event.target.value === ""
                                ? null
                                : Number(event.target.value),
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                      >
                        <option value="">Not rated</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} / 5
                          </option>
                        ))}
                      </select>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                          onClick={() =>
                            updateGame(game._id, {
                              favorite: !game.favorite,
                            })
                          }
                          aria-pressed={game.favorite}
                          className={`rounded-lg px-3 py-2 text-sm font-medium ${
                            game.favorite
                              ? "bg-pink-500/15 text-pink-400"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {game.favorite ? "♥ Favorited" : "♡ Favorite"}
                        </button>

                        <button
                          onClick={() => removeGame(game._id)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-950"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
