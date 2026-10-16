import { Link } from "react-router-dom";
import ProductPreview from "./ProductPreview";

const gridMask =
  "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 80%)";

const features = ["Personalized picks", "Library management", "Free to start"];

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-indigo-400"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Hero({ user, loading }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Photo: brighter, fades out toward the bottom */}
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
        />
        {/* Light tint, just enough for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/60 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-transparent to-gray-950/50" />
        <div className="absolute inset-0 bg-indigo-950/30 mix-blend-multiply" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />

        {/* Glows */}
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge with live dot */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-400/30 bg-gray-950/60 px-4 py-2 text-xs font-semibold tracking-widest text-indigo-200 shadow-lg shadow-indigo-950/40 backdrop-blur-md sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            DISCOVER. ORGANIZE. PLAY.
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-6xl sm:leading-[1.1] lg:text-7xl">
            Less scrolling.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              More playing.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-100/85 sm:text-lg sm:leading-8">
            Too many games, not enough time? Discover new titles, organize your
            library, and find what to play next with personalized
            recommendations.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {loading ? (
              <div className="h-[116px] sm:h-[52px]" aria-hidden="true" />
            ) : user ? (
              <>
                <Link
                  to="/recommend"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                >
                  Find My Next Game
                </Link>
                <Link
                  to="/library"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-gray-950/50 px-6 py-3.5 font-semibold backdrop-blur-sm transition hover:border-white/40 hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  View My Library
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                >
                  Get Started Free <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-gray-950/50 px-6 py-3.5 font-semibold backdrop-blur-sm transition hover:border-white/40 hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Explore Games
                </Link>
              </>
            )}
          </div>

          {/* Benefit chips */}
          {!loading && (
            <>
              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-200/90">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              {user && (
                <p className="mt-6 text-xs text-gray-300 sm:text-sm">
                  Ready for your next adventure?
                </p>
              )}
            </>
          )}
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}
