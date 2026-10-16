import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavLinkItem from "./NavLinkItem";

const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="NextPlay home"
          className={`group flex h-16 items-center gap-2.5 rounded-lg ${focus}`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-400/30 bg-gradient-to-br from-indigo-500/30 to-violet-500/20 text-indigo-200 transition group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6 11h4M8 9v4" />
              <circle cx="15.5" cy="10.5" r=".6" fill="currentColor" />
              <circle cx="17.5" cy="12.5" r=".6" fill="currentColor" />
              <path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.6 7A2.6 2.6 0 0 0 5.9 17.6L8 15h8l2.1 2.6a2.6 2.6 0 0 0 4.7-2.5l-1.6-7A4 4 0 0 0 17.3 5Z" />
            </svg>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Next
            </span>
            Play
          </span>
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-menu"
          className={`flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-300 hover:text-white sm:hidden ${focus}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menu: dropdown on mobile, inline row on desktop */}
        <div
          id="nav-menu"
          onClick={closeMenu}
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 border-t border-gray-800 py-4 sm:flex sm:w-auto sm:flex-row sm:items-center sm:border-0 sm:py-0`}
        >
          {loading ? null : user ? (
            <>
              <NavLinkItem to="/games">Discover</NavLinkItem>
              <NavLinkItem to="/library">My Library</NavLinkItem>
              <NavLinkItem to="/recommend" highlight>
                What to Play?
              </NavLinkItem>
              <span className="hidden h-6 w-px bg-gray-800 sm:mx-2 sm:block" />
              <button
                type="button"
                onClick={handleLogout}
                className={`rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 sm:py-2 ${focus}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLinkItem to="/login">Login</NavLinkItem>
              <Link
                to="/register"
                className={`rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-500 sm:py-2 ${focus}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
