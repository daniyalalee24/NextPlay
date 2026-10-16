import { Link } from "react-router-dom";

const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950";

const navLinks = [
  { to: "/games", label: "Discover" },
  { to: "/library", label: "My Library" },
  { to: "/recommend", label: "What to Play?" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniyalalee/",
    external: true,
    filled: true,
    icon: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "GitHub",
    href: "https://github.com/daniyalalee24",
    external: true,
    filled: true,
    icon: "M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.61 5.21-5.09 5.49.4.35.75 1.02.75 2.06v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z",
  },
  {
    label: "Email",
    href: "mailto:daniyal.alee19@gmail.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

function GamepadIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 11h4M8 9v4" />
      <circle cx="15.5" cy="10.5" r=".6" fill="currentColor" />
      <circle cx="17.5" cy="12.5" r=".6" fill="currentColor" />
      <path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.6 7A2.6 2.6 0 0 0 5.9 17.6L8 15h8l2.1 2.6a2.6 2.6 0 0 0 4.7-2.5l-1.6-7A4 4 0 0 0 17.3 5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-800/80 bg-gray-950">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-[min(700px,100%)] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Portfolio call to action */}

        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 p-6 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 left-1/3 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-1.5">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-300">
                    More from the developer
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  Enjoyed NextPlay?
                  <span className="mt-1 block text-gray-400">
                    There's more to explore.
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:mx-0 sm:text-base">
                  Take a look at my portfolio to see more projects, what I've
                  been building, and the technologies I work with.
                </p>
              </div>

              <a
                href="https://daniyal-portfolio-omega.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-auto ${focus}`}
              >
                Explore my portfolio
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d="M7 13 14 6M6 6h8v8" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-9 border-t border-gray-800/80 py-9 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:py-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1">
            <Link
              to="/"
              aria-label="NextPlay home"
              className={`group inline-flex items-center gap-2.5 rounded-lg ${focus}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/25 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 transition-colors group-hover:border-indigo-400/50 group-hover:text-indigo-200">
                <GamepadIcon />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  Next
                </span>
                Play
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Discover games, build your library, and find what to play next.
            </p>

            <p className="mt-4 text-xs font-medium tracking-wide text-gray-600">
              A SMARTER WAY TO FIND YOUR NEXT GAME
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-center gap-3 sm:items-start"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
              Explore
            </h3>

            <div className="flex flex-col items-center gap-2 sm:items-start">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-md py-1 text-sm text-gray-500 transition-colors hover:text-indigo-300 ${focus}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Connect */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
              Connect
            </h3>

            <p className="text-center text-sm text-gray-500 sm:text-left">
              Find me online or get in touch.
            </p>

            <div className="flex gap-2">
              {socials.map(({ label, href, external, filled, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900/70 text-gray-400 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-300 ${focus}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={filled ? "currentColor" : "none"}
                    stroke={filled ? "none" : "currentColor"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  >
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-800/80 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} NextPlay. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Designed & built by{" "}
            <span className="font-medium text-gray-300">Daniyal Ali</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
