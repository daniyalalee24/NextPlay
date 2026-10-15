import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function GameDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [libraryMessage, setLibraryMessage] = useState("");
  const [libraryError, setLibraryError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/games/${id}`);
        setGame(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Could not load game details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleAddToLibrary = async () => {
    if (!user) {
      setLibraryError("Please log in to add games to your library.");
      return;
    }

    setAdding(true);
    setLibraryMessage("");
    setLibraryError("");

    try {
      await api.post("/api/library", {
        gameId: game.id,
        title: game.name,
        cover: game.background_image || "",
        genres: game.genres?.map((genre) => genre.name) || [],
      });

      setLibraryMessage("Game added to your library!");
    } catch (error) {
      setLibraryError(
        error.response?.data?.message ||
          "Could not add this game. Please try again.",
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-white">
        Loading game details...
      </main>
    );
  }

  if (error || !game) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-white">
        <p className="mb-4 text-red-400">{error || "Game not found."}</p>
        <Link to="/games" className="text-indigo-400 hover:underline">
          Back to games
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/games"
          className="mb-8 inline-block text-indigo-400 hover:underline"
        >
          ← Back to games
        </Link>

        {game.background_image && (
          <img
            src={game.background_image}
            alt={game.name}
            className="mb-8 h-64 w-full rounded-xl object-cover md:h-96"
          />
        )}

        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{game.name}</h1>

        <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-300">
          <span className="rounded-full bg-gray-800 px-3 py-1">
            Released: {game.released || "Unknown"}
          </span>

          <span className="rounded-full bg-gray-800 px-3 py-1">
            Rating: {game.rating ?? "Not rated"}
          </span>

          <span className="rounded-full bg-gray-800 px-3 py-1">
            Metacritic: {game.metacritic ?? "N/A"}
          </span>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">About</h2>

          <p className="leading-7 text-gray-300">
            {game.description_raw || "No description available."}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Genres</h2>

          <div className="flex flex-wrap gap-2">
            {game.genres?.length ? (
              game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-indigo-600/20 px-3 py-1 text-indigo-300"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No genres listed.</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Platforms</h2>

          <div className="flex flex-wrap gap-2">
            {game.platforms?.length ? (
              game.platforms.map((item) => (
                <span
                  key={item.platform.id}
                  className="rounded-lg bg-gray-800 px-3 py-2 text-sm"
                >
                  {item.platform.name}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No platforms listed.</p>
            )}
          </div>
        </section>

        <section className="border-t border-gray-800 pt-6">
          <h2 className="mb-3 text-xl font-semibold">Your Library</h2>

          {!user && (
            <p className="mb-4 text-gray-400">
              Log in to save games to your personal library.
            </p>
          )}

          <button
            type="button"
            onClick={handleAddToLibrary}
            disabled={adding || !user}
            className="rounded-lg bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {adding ? "Adding..." : "＋ Add to Library"}
          </button>

          {libraryMessage && (
            <p role="status" className="mt-4 text-green-400">
              {libraryMessage}
            </p>
          )}

          {libraryError && (
            <p role="alert" className="mt-4 text-red-400">
              {libraryError}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
