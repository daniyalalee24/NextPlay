import { useAuth } from "../context/AuthContext";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import ClosingCTA from "../components/home/ClosingCTA";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen overflow-hidden bg-gray-950 text-white">
      <Hero user={user} loading={loading} />
      <Features />
      <ClosingCTA user={user} loading={loading} />
    </main>
  );
}
