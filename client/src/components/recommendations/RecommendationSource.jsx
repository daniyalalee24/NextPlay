export default function RecommendationSource({ source, onSelect }) {
  return (
    <section>
      <h3 className="font-semibold text-gray-200">03. Where should we look?</h3>

      <p className="mb-4 mt-1 text-sm text-gray-500">
        Choose where your recommendations come from.
      </p>

      <div className="space-y-3">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
            source === "discover"
              ? "border-indigo-500/50 bg-indigo-500/10"
              : "border-gray-800 bg-gray-950/50 hover:border-gray-700"
          }`}
        >
          <input
            type="radio"
            name="source"
            value="discover"
            checked={source === "discover"}
            onChange={() => onSelect("discover")}
            className="mt-1 h-4 w-4 accent-indigo-500"
          />

          <span className="flex-1">
            <span className="block text-sm font-semibold text-gray-200">
              Discover something new
            </span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              Find games from the RAWG database.
            </span>
          </span>

          <span className="text-lg" aria-hidden="true">
            ✦
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
            source === "backlog"
              ? "border-indigo-500/50 bg-indigo-500/10"
              : "border-gray-800 bg-gray-950/50 hover:border-gray-700"
          }`}
        >
          <input
            type="radio"
            name="source"
            value="backlog"
            checked={source === "backlog"}
            onChange={() => onSelect("backlog")}
            className="mt-1 h-4 w-4 accent-indigo-500"
          />

          <span className="flex-1">
            <span className="block text-sm font-semibold text-gray-200">
              Play something from my backlog
            </span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              Choose from games marked "Want to Play".
            </span>
          </span>

          <span className="text-lg" aria-hidden="true">
            ▤
          </span>
        </label>
      </div>
    </section>
  );
}
