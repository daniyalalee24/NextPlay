const SearchIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const LibraryIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="4" height="16" rx="1" />
    <rect x="10" y="4" width="4" height="16" rx="1" />
    <path d="m17 5.5 3.2.9a1 1 0 0 1 .7 1.2l-3.4 11.8a1 1 0 0 1-1.2.7l-.3-.1" />
  </svg>
);

const SparkIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" />
  </svg>
);

const features = [
  {
    number: "01",
    icon: SearchIcon,
    title: "Discover Your Next Game",
    description:
      "Search thousands of games and explore their genres, release dates, platforms, and artwork.",
    tag: "Powered by RAWG",
  },
  {
    number: "02",
    icon: LibraryIcon,
    title: "Build Your Library",
    description:
      "Keep track of games you want to play, games you're playing, and the ones you've completed.",
    tag: "Your personal collection",
  },
  {
    number: "03",
    icon: SparkIcon,
    title: "Get Smarter Recommendations",
    description:
      "Find games that fit your preferred genres, available gaming time, and personal ratings.",
    tag: "Custom scoring engine",
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative isolate overflow-hidden border-t border-gray-800/80 bg-gray-900/30 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Ambient glow to echo the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
            MADE FOR YOUR LIBRARY
          </p>
          <h2
            id="features-heading"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Your games,{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              your way.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Everything you need to spend less time deciding and more time
            playing.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <li key={feature.number} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/60 p-6 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-950/40 sm:p-7">
                {/* Top accent line */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 shadow-inner shadow-indigo-500/10 transition duration-300 group-hover:scale-105 group-hover:text-indigo-200">
                    {feature.icon}
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-semibold tracking-wider text-gray-600 transition-colors group-hover:text-indigo-400/80"
                  >
                    {feature.number}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>

                <div className="relative mt-auto pt-6">
                  <div className="border-t border-gray-800 pt-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      {feature.tag}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
