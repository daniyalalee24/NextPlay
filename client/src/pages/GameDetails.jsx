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
  const [retryCount, setRetryCount] = useState(0);

  const [adding, setAdding] = useState(false);
  const [libraryMessage, setLibraryMessage] = useState("");
  const [libraryError, setLibraryError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError("");
        setGame(null);
        setLibraryMessage("");
        setLibraryError("");

        const response = await api.get(`/api/games/${id}`);

        if (!cancelled) {
          setGame(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error.response?.data?.message ||
              "Could not load game details. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchGame();

    return () => {
      cancelled = true;
    };
  }, [id, retryCount]);

  const handleAddToLibrary = async () => {
    if (!user) {
      setLibraryError("Please log in to add games to your library.");
      setLibraryMessage("");
      return;
    }

    if (!game || adding) return;

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

      setLibraryMessage("Game added to your library successfully!");
    } catch (error) {
      setLibraryError(
        error.response?.data?.message ||
          "Could not add this game. Please try again.",
      );
    } finally {
      setAdding(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-4 py-8 text-white sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 h-5 w-32 rounded bg-gray-800" />

          <div className="mb-8 h-56 rounded-2xl bg-gray-800 sm:h-80 md:h-96" />

          <div className="mb-4 h-9 w-2/3 rounded bg-gray-800" />

          <div className="mb-8 flex flex-wrap gap-3">
            <div className="h-8 w-28 rounded-full bg-gray-800" />
            <div className="h-8 w-24 rounded-full bg-gray-800" />
            <div className="h-8 w-32 rounded-full bg-gray-800" />
          </div>

          <div className="mb-8 space-y-3">
            <div className="h-6 w-24 rounded bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-4/5 rounded bg-gray-800" />
          </div>

          <div className="mb-8">
            <div className="mb-4 h-6 w-24 rounded bg-gray-800" />
            <div className="flex flex-wrap gap-3">
              <div className="h-8 w-20 rounded-full bg-gray-800" />
              <div className="h-8 w-24 rounded-full bg-gray-800" />
              <div className="h-8 w-20 rounded-full bg-gray-800" />
            </div>
          </div>

          <div className="h-24 rounded-xl bg-gray-900" />
        </div>
      </main>
    );
  }

  // Error state
  if (error || !game) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-400">
            !
          </div>

          <h1 className="mb-2 text-xl font-bold">Unable to load game</h1>

          <p className="mb-6 text-sm leading-6 text-gray-400">
            {error || "This game could not be found."}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
            >
              Try again
            </button>

            <Link
              to="/games"
              className="rounded-lg border border-gray-700 px-5 py-3 font-medium transition hover:bg-gray-800"
            >
              Back to games
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Some API responses may include screenshots, while others do not.
  const screenshots = game.short_screenshots || game.screenshots || [];

  return (
    <main className="min-h-screen bg-gray-950 pb-16 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Link
          to="/games"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-indigo-400"
        >
          <span aria-hidden="true">←</span>
          Back to games
        </Link>

        {/* Game banner */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          {game.background_image ? (
            <img
              src={game.background_image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/20" />

          <div className="relative flex min-h-64 flex-col justify-end p-5 sm:min-h-80 sm:p-8 md:min-h-96 md:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Game Details
            </p>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {game.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.released && (
                <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 backdrop-blur-sm">
                  Released {game.released}
                </span>
              )}

              {game.rating != null && (
                <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 backdrop-blur-sm">
                  <span className="text-amber-400">★</span> {game.rating}/5
                  {game.ratings_count != null && (
                    <span className="text-gray-400">
                      {" "}
                      ({game.ratings_count.toLocaleString()} ratings)
                    </span>
                  )}
                </span>
              )}

              {game.metacritic != null && (
                <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 backdrop-blur-sm">
                  Metacritic:{" "}
                  <span
                    className={
                      game.metacritic >= 75
                        ? "font-semibold text-green-400"
                        : game.metacritic >= 50
                          ? "font-semibold text-amber-400"
                          : "font-semibold text-red-400"
                    }
                  >
                    {game.metacritic}
                  </span>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Game information */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-8">
            {/* About */}
            <section>
              <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                About this game
              </h2>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-300 sm:text-base">
                {game.description_raw ||
                  "No description available for this game."}
              </p>
            </section>

            {/* Genres */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Genres</h2>

              <div className="flex flex-wrap gap-2">
                {game.genres?.length ? (
                  game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 transition hover:border-indigo-400/50"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No genres listed.</p>
                )}
              </div>
            </section>

            {/* Platforms */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Available platforms</h2>

              <div className="flex flex-wrap gap-2">
                {game.platforms?.length ? (
                  game.platforms.map((item) => (
                    <span
                      key={item.platform.id}
                      className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300"
                    >
                      {item.platform.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No platforms listed.</p>
                )}
              </div>
            </section>

            {/* Screenshots, when supplied by the API */}
            {screenshots.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold">Screenshots</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {screenshots.map((screenshot, index) => {
                    const imageUrl =
                      typeof screenshot === "string"
                        ? screenshot
                        : screenshot.image;

                    if (!imageUrl) return null;

                    return (
                      <div
                        key={screenshot.id || imageUrl || index}
                        className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
                      >
                        <img
                          src={imageUrl}
                          alt={`${game.name} screenshot ${index + 1}`}
                          loading="lazy"
                          className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Library panel */}
          <aside className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6 lg:sticky lg:top-24">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Your Collection
            </p>

            <h2 className="mb-2 text-xl font-bold">Keep track of this game</h2>

            <p className="mb-5 text-sm leading-6 text-gray-400">
              Save this game to your personal library and manage your gaming
              backlog.
            </p>

            {!user && (
              <p className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">
                Log in to save games to your library.
              </p>
            )}

            <button
              type="button"
              onClick={handleAddToLibrary}
              disabled={adding}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {adding ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                  Adding game...
                </>
              ) : !user ? (
                "＋ Add to Library"
              ) : (
                "＋ Add to Library"
              )}
            </button>

            {libraryMessage && (
              <div
                role="status"
                className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300"
              >
                <p className="font-medium">✓ Success</p>
                <p className="mt-1">{libraryMessage}</p>

                <Link
                  to="/library"
                  className="mt-3 inline-block font-medium underline underline-offset-4 hover:text-green-200"
                >
                  View your library →
                </Link>
              </div>
            )}

            {libraryError && (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
              >
                <p>{libraryError}</p>

                {!user && (
                  <Link
                    to="/login"
                    className="mt-2 inline-block font-medium underline underline-offset-4 hover:text-red-200"
                  >
                    Log in →
                  </Link>
                )}
              </div>
            )}

            <p className="mt-4 text-center text-xs text-gray-500">
              Your collection, your next adventure.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
