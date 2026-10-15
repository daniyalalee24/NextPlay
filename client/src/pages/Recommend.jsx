import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const availableGenres = [
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Puzzle",
  "Strategy",
  "Indie",
  "Platformer",
  "Racing",
  "Sports",
];

const sessionLengths = [
  { label: "Casual (< 1 hr)", value: "Casual" },
  { label: "Medium (1–3 hrs)", value: "Medium" },
  { label: "Long (3+ hrs)", value: "Long" },
];

export default function Recommend() {
  const [selectedGenres, setSelectedGenres] = useState(["Action", "RPG"]);
  const [sessionLength, setSessionLength] = useState("Medium");
  const [source, setSource] = useState("discover"); // "discover" | "backlog"

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleGetRecommendations = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      setError("Please select at least one genre.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const response = await api.post("/api/recommendations", {
        genres: selectedGenres,
        sessionLength,
        source,
      });

      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not get recommendations. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">
            What Should I Play? 🎮
          </h1>
          <p className="mt-2 text-gray-400">
            Tell NextPlay what you're in the mood for, and our scoring engine
            will pick the best match.
          </p>
        </div>

        {/* Preference Selection Form */}
        <form
          onSubmit={handleGetRecommendations}
          className="mb-10 space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-6"
        >
          {/* Genre Picker */}
          <div>
            <label className="mb-3 block font-semibold text-gray-200">
              1. Select preferred genres:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Session Length Selector */}
          <div>
            <label className="mb-3 block font-semibold text-gray-200">
              2. How much time do you have?
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {sessionLengths.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSessionLength(item.value)}
                  className={`rounded-lg border p-3 text-center text-sm font-medium transition-colors ${
                    sessionLength === item.value
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                      : "border-gray-800 bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Source Toggle */}
          <div>
            <label className="mb-3 block font-semibold text-gray-200">
              3. Where should we look?
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="source"
                  value="discover"
                  checked={source === "discover"}
                  onChange={() => setSource("discover")}
                  className="accent-indigo-500"
                />
                Discover fresh games (RAWG Database)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="source"
                  value="backlog"
                  checked={source === "backlog"}
                  onChange={() => setSource("backlog")}
                  className="accent-indigo-500"
                />
                Pick from my "Want to Play" backlog
              </label>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-950 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-center font-bold transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Calculating match scores..." : "Get Recommendations 🎯"}
          </button>
        </form>

        {/* Results Section */}
        {hasSearched && (
          <section>
            <h2 className="mb-6 text-2xl font-bold">Recommended for You</h2>

            {recommendations.length === 0 ? (
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
                No games matched your exact combination. Try adjusting your
                selected genres or source!
              </div>
            ) : (
              <div className="space-y-6">
                {recommendations.map((game, index) => (
                  <article
                    key={game.gameId}
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 sm:flex-row"
                  >
                    {/* Game Cover */}
                    {game.cover ? (
                      <img
                        src={game.cover}
                        alt={game.title}
                        loading="lazy"
                        className="h-48 w-full object-cover sm:h-auto sm:w-56"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-gray-800 text-gray-500 sm:h-auto sm:w-56">
                        No image
                      </div>
                    )}

                    {/* Content & Reasons */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-xl font-bold text-white">
                            {index + 1}. {game.title}
                          </h3>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                            {game.score} / 100 Match Score
                          </span>
                        </div>

                        {/* Genres */}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {game.genres.map((g) => (
                            <span
                              key={g}
                              className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
                            >
                              {g}
                            </span>
                          ))}
                        </div>

                        {/* Why this game? */}
                        <div className="mt-4 rounded-lg bg-gray-950 p-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Why this game?
                          </h4>
                          <ul className="mt-2 space-y-1 text-sm text-gray-300">
                            {game.reasons.map((reason, rIdx) => (
                              <li
                                key={rIdx}
                                className="flex items-center gap-2"
                              >
                                <span className="text-emerald-400">✓</span>{" "}
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Link to Details */}
                      <div className="mt-4 flex justify-end">
                        <Link
                          to={`/games/${game.gameId}`}
                          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                          View Game Details →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
