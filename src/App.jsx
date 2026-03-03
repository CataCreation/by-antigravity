import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/theme.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import OwnerDashboard from "./pages/OwnerDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage onLogin={setUser} />} />
        <Route path="/dashboard" element={user ? <OwnerDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--muted)" }}>
      <div style={{ fontSize: 64 }}>🏠</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--secondary)" }}>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14 }}>← Back to Home</a>
    </div>
  );
}
