import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate("/library", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] items-center justify-center overflow-hidden bg-gray-950 px-4 py-12 text-white">
      {/* Ambient Background Glows */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-emerald-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism Form Card */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
          {/* Centered Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Log in to manage your game library and discover your next
              adventure.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm leading-6 text-red-300"
            >
              <span className="mt-0.5 text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
              >
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-950/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="you@example.com"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-950/80 py-3 pl-10 pr-20 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="••••••••"
                  required
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-2 my-auto h-fit rounded-lg px-2.5 py-1 text-xs font-medium text-gray-400 transition hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
              )}
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Bottom Register Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
