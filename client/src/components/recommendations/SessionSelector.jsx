const sessions = [
  {
    label: "Quick session",
    duration: "Under 1 hour",
    value: "Casual",
    icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  },
  {
    label: "A few hours",
    duration: "1–3 hours",
    value: "Medium",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  },
  {
    label: "Long session",
    duration: "3+ hours",
    value: "Long",
    icon: "M6 2h12M6 22h12M7 2v4a5 5 0 0 0 2 4l3 2-3 2a5 5 0 0 0-2 4v4M17 2v4a5 5 0 0 1-2 4l-3 2 3 2a5 5 0 0 1 2 4v4",
  },
];

export default function SessionSelector({ sessionLength, onSelect }) {
  return (
    <section>
      <h3 className="flex items-center gap-2.5 font-semibold text-gray-200">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-300">
          2
        </span>
        How much time do you have?
      </h3>
      <p className="mb-4 mt-2 text-sm text-gray-500">
        Pick the session that fits your schedule.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {sessions.map(({ label, duration, value, icon }) => {
          const selected = sessionLength === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(value)}
              className={`rounded-xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selected
                  ? "border-indigo-400/50 bg-indigo-500/10"
                  : "border-gray-800 bg-gray-950/50 hover:border-gray-700"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-6 w-6 ${selected ? "text-indigo-300" : "text-gray-500"}`}
                aria-hidden="true"
              >
                <path d={icon} />
              </svg>
              <span
                className={`mt-3 block text-sm font-semibold ${
                  selected ? "text-indigo-300" : "text-gray-200"
                }`}
              >
                {label}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {duration}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
