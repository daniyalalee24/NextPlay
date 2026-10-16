import { Link } from "react-router-dom";

export default function ClosingCTA({ user, loading }) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-20"
    >
      <div className="relative isolate overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl"
        />

        {/* Decorative controller graphic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 top-1/2 hidden -translate-y-1/2 rotate-[-12deg] text-indigo-400/[0.07] sm:block lg:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-48 w-48 lg:h-64 lg:w-64"
          >
            <path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.6 7A2.6 2.6 0 0 0 5.9 17.6L8 15h8l2.1 2.6a2.6 2.6 0 0 0 4.7-2.5l-1.6-7A4 4 0 0 0 17.3 5Z" />
            <path d="M6 11h4M8 9v4" />
            <circle cx="15.5" cy="10.5" r=".6" fill="currentColor" />
            <circle cx="17.5" cy="12.5" r=".6" fill="currentColor" />
          </svg>
        </div>

        <div className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
              Your next adventure awaits
            </span>
          </div>

          {/* Heading */}
          <h2
            id="closing-cta-heading"
            className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            One library.
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              Endless possibilities.
            </span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
            Not sure what to play next? Discover new games, keep track of your
            favorites, and let NextPlay help you choose your next adventure.
          </p>

          {/* Actions */}
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:justify-start">
            {loading ? (
              <div
                className="h-12 w-full animate-pulse rounded-xl bg-gray-800 sm:w-48"
                aria-hidden="true"
              />
            ) : (
              <>
                <Link
                  to={user ? "/recommend" : "/games"}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:w-auto"
                >
                  {user ? "Find My Next Game" : "Explore Games"}
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M4 10h12M10 4l6 6-6 6" />
                  </svg>
                </Link>

                {!user && (
                  <Link
                    to="/register"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-gray-700 bg-gray-950/50 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:w-auto"
                  >
                    Create an account
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Small supporting note */}
          <p className="mt-5 text-xs text-gray-500">
            Discover games. Build your library. Play your way.
          </p>
        </div>
      </div>
    </section>
  );
}
