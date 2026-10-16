import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setSuccess(
        response.data?.message ||
          "Your account has been created successfully. You can now log in.",
      );

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please check your details and try again.",
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
        className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism Form Card */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
          {/* Centered Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Build your game library and find something new to play.
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

          {success && (
            <div
              role="status"
              className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-300"
            >
              <p className="font-semibold">✓ Account created</p>
              <p className="mt-1">{success}</p>

              <Link
                to="/login"
                className="mt-3 inline-block font-semibold underline underline-offset-4 hover:text-emerald-200"
              >
                Continue to login →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
              >
                Full name
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-950/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Your name"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="register-email"
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
                  id="register-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                htmlFor="register-password"
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
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-950/80 py-3 pl-10 pr-20 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Create a password"
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
              <p className="mt-2 text-xs text-gray-500">
                Create a unique password.
              </p>
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
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Bottom Login Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
