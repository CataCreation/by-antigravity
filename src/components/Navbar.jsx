import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    padding: "8px 14px",
    borderRadius: "var(--radius-btn)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: isActive(path) ? 600 : 500,
    color: isActive(path) ? "var(--primary)" : "var(--text)",
    background: isActive(path) ? "var(--primary-light)" : "transparent",
    transition: "var(--transition)",
  });

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--white)",
        boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        borderBottom: "1px solid var(--border)",
        transition: "box-shadow 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 700 }}>K</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--secondary)" }}>Kanelijo</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link to="/" style={linkStyle("/")}>Home</Link>
            <Link to="/rooms" style={linkStyle("/rooms")}>Rooms</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user ? (
              <>
                <Link to="/dashboard" style={{ padding: "8px 16px", borderRadius: "var(--radius-btn)", textDecoration: "none", fontSize: 14, fontWeight: 500, color: "var(--text)", border: "1px solid var(--border)" }}>Dashboard</Link>
                <button onClick={onLogout} style={{ padding: "8px 16px", borderRadius: "var(--radius-btn)", fontSize: 14, color: "var(--danger)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer" }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ padding: "8px 18px", borderRadius: "var(--radius-btn)", textDecoration: "none", fontSize: 14, fontWeight: 500, color: "var(--text)", border: "1px solid var(--border)" }}>Sign In</Link>
                <Link to="/register" style={{ padding: "8px 18px", borderRadius: "var(--radius-btn)", textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: "var(--primary)" }}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div style={{ height: 64 }} />
    </>
  );
}
