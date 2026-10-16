import { Link } from "react-router-dom";

export default function ClosingCTA({ user, loading }) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-20"
    >
      <div className="relative isolate overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950/60 p-8 shadow-2xl shadow-indigo-950/30 sm:p-10 lg:p-12">
        {/* Subtle grid, same language as the hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 100% at 100% 0%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 100% at 100% 0%, black 20%, transparent 75%)",
          }}
        />

        {/* Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl"
        />

        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent"
        />

        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
              READY WHEN YOU ARE
            </p>
            <h2
              id="closing-cta-heading"
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Ready to find{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
                your next game?
              </span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              Your next great gaming session starts with one search.
            </p>
          </div>

          {loading ? (
            <div className="h-[52px] w-48 shrink-0" aria-hidden="true" />
          ) : (
            <Link
              to={user ? "/recommend" : "/games"}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold shadow-lg shadow-indigo-950/50 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-auto"
            >
              {user ? "Get Recommendations" : "Explore Games"}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
