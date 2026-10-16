import { useState } from "react";
import api from "../services/api";
import GenreSelector from "../components/recommendations/GenreSelector";
import SessionSelector from "../components/recommendations/SessionSelector";
import RecommendationSource from "../components/recommendations/RecommendationSource";
import RecommendationResults from "../components/recommendations/RecommendationResults";

export default function Recommend() {
  const [selectedGenres, setSelectedGenres] = useState(["Action", "RPG"]);
  const [sessionLength, setSessionLength] = useState("Medium");
  const [source, setSource] = useState("discover");

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const toggleGenre = (genre) => {
    setError("");
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((g) => g !== genre)
        : [...current, genre],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGenres.length) {
      return setError("Choose at least one genre to get recommendations.");
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    setRecommendations([]);

    try {
      const { data } = await api.post("/api/recommendations", {
        genres: selectedGenres,
        sessionLength,
        source,
      });
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't find recommendations right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
            YOUR PERSONAL GAME FINDER
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            What should I{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              play?
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Tell us what you're in the mood for and how much time you have.
            NextPlay will score your options and explain why each game could be
            a good match.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5 shadow-xl shadow-black/20 sm:p-7"
          >
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Your preferences</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Customize your next gaming session.
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
                  <circle cx="15" cy="7" r="2" />
                  <circle cx="9" cy="17" r="2" />
                </svg>
              </span>
            </div>

            <GenreSelector
              selectedGenres={selectedGenres}
              onToggle={toggleGenre}
            />
            <hr className="my-7 border-gray-800" />
            <SessionSelector
              sessionLength={sessionLength}
              onSelect={setSessionLength}
            />
            <hr className="my-7 border-gray-800" />
            <RecommendationSource source={source} onSelect={setSource} />

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm leading-6 text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  Finding your matches...
                </>
              ) : (
                "Find My Games"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Recommendations are based on your selected preferences.
            </p>
          </form>

          <RecommendationResults
            recommendations={recommendations}
            loading={loading}
            error={error}
            hasSearched={hasSearched}
            source={source}
          />
        </div>
      </div>
    </main>
  );
}
