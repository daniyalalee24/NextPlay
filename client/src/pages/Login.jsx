import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
