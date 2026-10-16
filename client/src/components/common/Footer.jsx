import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          {/* Brand */}
          <Link
            to="/"
            className="rounded-md text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-80"
            aria-label="NextPlay home"
          >
            <span className="text-indigo-400">Next</span>Play
            <span className="ml-1.5 text-base" aria-hidden="true">
              🎮
            </span>
          </Link>

          {/* Footer links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm"
          >
            <Link
              to="/games"
              className="text-gray-400 transition-colors hover:text-indigo-400"
            >
              Discover
            </Link>

            <Link
              to="/library"
              className="text-gray-400 transition-colors hover:text-indigo-400"
            >
              My Library
            </Link>

            <Link
              to="/recommend"
              className="text-gray-400 transition-colors hover:text-indigo-400"
            >
              What to Play?
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} NextPlay. Built by Daniyal Ali.
        </div>
      </div>
    </footer>
  );
}
