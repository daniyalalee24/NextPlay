const sessionLengths = [
  {
    label: "Quick session",
    duration: "Under 1 hour",
    value: "Casual",
    icon: "⚡",
  },
  {
    label: "A few hours",
    duration: "1–3 hours",
    value: "Medium",
    icon: "🎮",
  },
  {
    label: "Long session",
    duration: "3+ hours",
    value: "Long",
    icon: "🕹️",
  },
];

export default function SessionSelector({ sessionLength, onSelect }) {
  return (
    <section>
      <h3 className="font-semibold text-gray-200">
        02. How much time do you have?
      </h3>

      <p className="mb-4 mt-1 text-sm text-gray-500">
        Pick the session that fits your schedule.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {sessionLengths.map((item) => {
          const selected = sessionLength === item.value;

          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(item.value)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-indigo-500/60 bg-indigo-500/10"
                  : "border-gray-800 bg-gray-950/50 hover:border-gray-700"
              }`}
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>

              <span
                className={`mt-3 block text-sm font-semibold ${
                  selected ? "text-indigo-300" : "text-gray-200"
                }`}
              >
                {item.label}
              </span>

              <span className="mt-1 block text-xs text-gray-500">
                {item.duration}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
