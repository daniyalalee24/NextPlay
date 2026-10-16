const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
  "aria-hidden": true,
};

const SearchIcon = (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const LibraryIcon = (
  <svg {...iconProps}>
    <rect x="3" y="4" width="4" height="16" rx="1" />
    <rect x="10" y="4" width="4" height="16" rx="1" />
    <path d="m17 5.5 3.2.9a1 1 0 0 1 .7 1.2l-3.4 11.8a1 1 0 0 1-1.2.7l-.3-.1" />
  </svg>
);

const SparkIcon = (
  <svg {...iconProps}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" />
  </svg>
);

const previewCards = [
  {
    label: "DISCOVER",
    icon: SearchIcon,
    title: "Find new games",
    description: "Explore titles across genres and platforms.",
    iconStyle: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
  },
  {
    label: "ORGANIZE",
    icon: LibraryIcon,
    title: "Manage your backlog",
    description: "Keep your collection organized in one place.",
    iconStyle: "border-violet-400/20 bg-violet-500/10 text-violet-300",
  },
  {
    label: "RECOMMEND",
    icon: SparkIcon,
    title: "Choose what to play",
    description: "Get suggestions matched to your preferences.",
    iconStyle: "border-indigo-400/30 bg-indigo-500/20 text-indigo-200",
    highlighted: true,
  },
];

export default function ProductPreview() {
  return (
    <div className="relative isolate mx-auto mt-16 max-w-4xl sm:mt-20">
      {/* Glow behind the window */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-r from-indigo-600/25 via-violet-500/15 to-indigo-600/25 blur-3xl"
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/75 p-3 shadow-2xl shadow-indigo-950/40 ring-1 ring-indigo-400/10 backdrop-blur-md sm:p-5">
        {/* Window bar */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-800 px-2 pb-4 sm:px-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>

          <span className="hidden text-xs font-medium tracking-wider text-gray-400 sm:block">
            NEXTPLAY — YOUR GAMING SPACE
          </span>

          <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            Ready
          </span>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-3">
          {previewCards.map((card) => (
            <li key={card.label} className="flex">
              <div
                className={`group relative flex w-full flex-col overflow-hidden rounded-xl border p-4 text-left transition duration-300 hover:-translate-y-0.5 sm:p-5 ${
                  card.highlighted
                    ? "border-indigo-400/30 bg-gradient-to-b from-indigo-500/[0.14] to-indigo-500/[0.04] shadow-lg shadow-indigo-950/40"
                    : "border-gray-800 bg-gray-950/80 hover:border-indigo-500/30"
                }`}
              >
                {card.highlighted && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent"
                  />
                )}

                <div className="flex items-center justify-between">
                  <p
                    className={`text-[11px] font-semibold tracking-[0.15em] ${
                      card.highlighted ? "text-indigo-300" : "text-gray-400"
                    }`}
                  >
                    {card.label}
                  </p>
                  {card.highlighted && (
                    <span className="rounded-full bg-indigo-400/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-200">
                      TOP PICK
                    </span>
                  )}
                </div>

                <div
                  className={`mt-5 flex h-12 w-12 items-center justify-center rounded-xl border transition duration-300 group-hover:scale-105 ${card.iconStyle}`}
                >
                  {card.icon}
                </div>

                <p className="mt-4 font-semibold tracking-tight">
                  {card.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-xs font-medium tracking-[0.25em] text-gray-400">
        DISCOVER <span className="text-indigo-400">·</span> ORGANIZE{" "}
        <span className="text-indigo-400">·</span> PLAY
      </p>
    </div>
  );
}
