import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Library from "./pages/Library";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Recommend from "./pages/Recommend";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />

        {/* Protected Routes (using Outlet inside ProtectedRoute) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/library" element={<Library />} />
          <Route path="/recommend" element={<Recommend />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
