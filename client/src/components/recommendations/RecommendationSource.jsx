const options = [
  {
    value: "discover",
    title: "Discover something new",
    text: "Find games from the RAWG database.",
    icon: "m20 20-3.5-3.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  },
  {
    value: "backlog",
    title: "Play something from my backlog",
    text: 'Choose from games marked "Want to Play".',
    icon: "M4 6h16M4 12h16M4 18h10",
  },
];

export default function RecommendationSource({ source, onSelect }) {
  return (
    <section>
      <h3 className="flex items-center gap-2.5 font-semibold text-gray-200">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-300">
          3
        </span>
        Where should we look?
      </h3>
      <p className="mb-4 mt-2 text-sm text-gray-500">
        Choose where your recommendations come from.
      </p>

      <div className="space-y-3">
        {options.map(({ value, title, text, icon }) => {
          const selected = source === value;
          return (
            <label
              key={value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition focus-within:ring-2 focus-within:ring-indigo-400/60 ${
                selected
                  ? "border-indigo-400/50 bg-indigo-500/10"
                  : "border-gray-800 bg-gray-950/50 hover:border-gray-700"
              }`}
            >
              <input
                type="radio"
                name="source"
                value={value}
                checked={selected}
                onChange={() => onSelect(value)}
                className="mt-1 h-4 w-4 accent-indigo-500"
              />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-gray-200">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">
                  {text}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className={`h-5 w-5 shrink-0 ${selected ? "text-indigo-300" : "text-gray-600"}`}
                aria-hidden="true"
              >
                <path d={icon} />
              </svg>
            </label>
          );
        })}
      </div>
    </section>
  );
}
