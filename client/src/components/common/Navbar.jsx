import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white transition-opacity hover:opacity-80"
        >
          <span className="text-indigo-500">Next</span>Play 🎮
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <>
              <Link
                to="/games"
                className="hidden text-sm font-medium text-gray-300 transition-colors hover:text-white sm:block"
              >
                Discover
              </Link>
              <Link
                to="/library"
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                My Library
              </Link>
              <Link
                to="/recommend"
                className="rounded-lg bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-400 transition-colors hover:bg-indigo-500/20"
              >
                What to Play?
              </Link>
              <div className="ml-2 hidden h-6 w-px bg-gray-700 sm:block"></div>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
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
