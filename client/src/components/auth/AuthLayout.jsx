import { Link } from "react-router-dom";

export default function AuthLayout({
  title,
  accent,
  subtitle,
  error,
  notice,
  onSubmit,
  submitting,
  submitLabel,
  footerText,
  footerTo,
  footerLink,
  children,
}) {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-140px)] items-center justify-center overflow-hidden bg-gray-950 px-4 py-10 text-white sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 max-w-full -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />

      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              {accent}
            </span>
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">{subtitle}</p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm leading-6 text-red-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            </svg>
            {error}
          </div>
        )}

        {notice}

        <form onSubmit={onSubmit}>
          <fieldset disabled={submitting} className="min-w-0 space-y-5">
            {children}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
              )}
              {submitLabel}
            </button>
          </fieldset>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          {footerText}{" "}
          <Link
            to={footerTo}
            className="font-semibold text-indigo-400 transition hover:text-indigo-300 focus:outline-none focus-visible:underline"
          >
            {footerLink}
          </Link>
        </p>
      </div>
    </main>
  );
}
