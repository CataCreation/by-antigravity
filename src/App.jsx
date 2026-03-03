import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/theme.css";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import OwnerDashboard from "./pages/OwnerDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check existing session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) await loadUserProfile(session.user);
      setLoading(false);
    });

    // Listen for login/logout/Google callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser) => {
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();
      setUser(profile || authUser);
    } catch {
      setUser(authUser);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 44, height: 44, background: "var(--primary)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "white" }}>K</div>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading Kanelijo...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage onLogin={setUser} />} />
        <Route path="/auth/callback" element={<AuthCallback onLogin={setUser} />} />
        <Route path="/dashboard" element={user ? <OwnerDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthCallback({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!profile) {
          await supabase.from("users").insert([{
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || "",
            user_type: "seeker",
          }]);
        }

        onLogin?.(profile || session.user);
        navigate("/rooms");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--muted)" }}>Signing you in...</p>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--muted)" }}>
      <div style={{ fontSize: 64 }}>🏠</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--secondary)" }}>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14 }}>Back to Home</a>
    </div>
  );
}
