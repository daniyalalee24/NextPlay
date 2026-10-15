import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <span className="rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-400 border border-indigo-500/20">
          Smart Gaming Discovery
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Find your <span className="text-indigo-500">next game</span> without
          the endless scrolling.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
          NextPlay tracks your gaming library and uses a custom, weighted
          scoring engine to recommend games tailored to your preferred genres,
          available session time, and rating history.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {user ? (
            <>
              <Link
                to="/recommend"
                className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold transition-colors hover:bg-indigo-500"
              >
                What Should I Play? 🎮
              </Link>
              <Link
                to="/library"
                className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-3.5 font-bold transition-colors hover:bg-gray-800"
              >
                Go to My Library
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold transition-colors hover:bg-indigo-500"
              >
                Get Started Free
              </Link>
              <Link
                to="/games"
                className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-3.5 font-bold transition-colors hover:bg-gray-800"
              >
                Explore Database
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="border-t border-gray-800 bg-gray-900/50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Built for gamers who actually want to play.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400">
                🔍
              </div>
              <h3 className="mt-4 text-xl font-bold">RAWG Database Search</h3>
              <p className="mt-2 text-sm text-gray-400">
                Access thousands of games with real-time release details, genre
                tags, and cover art powered by the RAWG API.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400">
                📚
              </div>
              <h3 className="mt-4 text-xl font-bold">
                Personal Library Tracking
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Organize games into "Want to Play", "Playing", and "Completed"
                statuses. Add personal 1–5 star ratings and favorite flags.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400">
                🎯
              </div>
              <h3 className="mt-4 text-xl font-bold">
                Explainable Recommendations
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Get scored match suggestions complete with clear reasons
                explaining exact genre, session length, and library alignment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
