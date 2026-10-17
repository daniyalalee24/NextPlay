import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import About from "./pages/About";
import Library from "./pages/Library";
import Recommend from "./pages/Recommend";

// Start every page at the top when the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/about" element={<About />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<Library />} />
            <Route path="/recommend" element={<Recommend />} />
          </Route>

          {/* Unknown URLs go home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
