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
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    );
  };

  const handleGetRecommendations = async (event) => {
    event.preventDefault();

    if (selectedGenres.length === 0) {
      setError("Choose at least one genre to get recommendations.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      setRecommendations([]);

      const response = await api.post("/api/recommendations", {
        genres: selectedGenres,
        sessionLength,
        source,
      });

      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "We couldn't find recommendations right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-9">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 sm:text-sm">
            <span aria-hidden="true">✳</span>
            YOUR PERSONAL GAME FINDER
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            What should I <span className="text-indigo-400">play?</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Tell us what you're in the mood for and how much time you have.
            NextPlay will score your options and explain why each game could be
            a good match.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Preferences */}
          <form
            onSubmit={handleGetRecommendations}
            className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5 sm:p-7"
          >
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Your preferences</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Customize your next gaming session.
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-300">
                ⚙
              </span>
            </div>

            {/* Genre Selection */}
            <GenreSelector
              selectedGenres={selectedGenres}
              onToggle={toggleGenre}
            />

            <div className="my-7 border-t border-gray-800" />

            {/* Session Length */}
            <SessionSelector
              sessionLength={sessionLength}
              onSelect={setSessionLength}
            />

            <div className="my-7 border-t border-gray-800" />

            {/* Recommendation Source */}
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
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold shadow-lg shadow-indigo-950/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
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
                <>Find My Games</>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-gray-600">
              Recommendations are based on your selected preferences.
            </p>
          </form>

          {/* Results */}
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
