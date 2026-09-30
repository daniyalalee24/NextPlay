import { useAuth } from "../context/AuthContext";

export default function Library() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">My Library</h1>

      <p>Welcome, {user.name}</p>

      <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
