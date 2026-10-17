import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const values = [
  {
    title: "Less scrolling",
    text: "Endless catalogs make choosing harder. NextPlay narrows thousands of games down to a few good ones.",
    icon: "m20 20-3.5-3.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  },
  {
    title: "Explained picks",
    text: "Every recommendation comes with a match score and the reasons behind it, so you can see why a game fits you.",
    icon: "M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  },
  {
    title: "Built around you",
    text: "Your genres, your free time and your own ratings shape the results, not a one-size-fits-all chart.",
    icon: "M12 21s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 8 2.7c0 6.1-8 11-8 11Z",
  },
];

const steps = [
  ["Search", "Browse thousands of games with data from the RAWG database."],
  [
    "Save",
    "Add games to your library and track what you want to play, are playing, or have finished.",
  ],
  [
    "Play",
    "Tell NextPlay your mood and time, and get ranked picks you can act on.",
  ],
];

const links = [
  { label: "Portfolio", href: "https://daniyal-portfolio-omega.vercel.app/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daniyalalee/" },
  { label: "Email", href: "mailto:daniyal.alee19@gmail.com" },
];

const gradient =
  "bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent";

// Eyebrow + title. `center` = left on mobile, centered from sm up.
function Heading({ id, eyebrow, center, big, children }) {
  const Tag = big ? "h1" : "h2";
  return (
    <div className={center ? "text-left sm:text-center" : ""}>
      <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
        {eyebrow}
      </p>
      <Tag
        id={id}
        className={`mt-3 font-extrabold tracking-tight ${
          big ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}

export default function About() {
  const { user } = useAuth();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl space-y-16 sm:space-y-20">
        {/* Header */}
        <header className="mx-auto max-w-3xl">
          <Heading eyebrow="ABOUT NEXTPLAY" center big>
            Your backlog is long.{" "}
            <span className={gradient}>Your time isn't.</span>
          </Heading>
          <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-center sm:text-base sm:leading-7">
            NextPlay is a personal gaming companion that helps you discover
            games, organize what you own, and decide what to play next, without
            the endless scrolling.
          </p>
        </header>

        {/* Values */}
        <section aria-labelledby="values-heading">
          <Heading id="values-heading" eyebrow="WHAT WE BELIEVE" center>
            Choosing a game should be <span className={gradient}>fun</span>
          </Heading>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map(({ title, text, icon }) => (
              <li
                key={title}
                className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/60 p-6 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300">
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
                    <path d={icon} />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section
          aria-labelledby="steps-heading"
          className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-xl shadow-black/20 sm:p-10"
        >
          <Heading id="steps-heading" eyebrow="HOW IT WORKS">
            From search to play in three steps
          </Heading>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15 font-mono text-sm font-semibold text-indigo-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-400">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Builder */}
        <section
          aria-labelledby="maker-heading"
          className="relative isolate overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-gray-900 to-indigo-950/50 p-6 shadow-2xl shadow-indigo-950/30 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl"
          />
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/40 to-violet-500/20 text-2xl font-extrabold text-indigo-100 sm:h-24 sm:w-24 sm:text-3xl"
            >
              DA
            </span>

            <div className="flex-1">
              <Heading id="maker-heading" eyebrow="THE BUILDER">
                Hi, I'm Daniyal
              </Heading>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
                I designed and built NextPlay as a full-stack project because I
                kept running out of time before I ran out of games. It pulls
                data from the RAWG API and ranks games with a custom scoring
                engine based on your genres, free time and ratings.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    {...(!href.startsWith("mailto") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="rounded-xl border border-gray-700 bg-gray-950/60 px-4 py-2 text-sm font-medium text-gray-200 transition hover:-translate-y-0.5 hover:border-indigo-500/50 hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to find <span className={gradient}>your next game?</span>
          </h2>
          <Link
            to={user ? "/recommend" : "/register"}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 sm:w-auto"
          >
            {user ? "Get Recommendations" : "Get Started Free"}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
