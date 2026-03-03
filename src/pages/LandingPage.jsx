import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";

const FEATURED_ROOMS = [
  { id: "1", title: "Affordable Room for Students", city: "Sehore", room_type: "Single Room", rent: 3000, is_verified: true, owner: { full_name: "Mohan Singh" }, amenities: [{ name: "WiFi" }, { name: "Bathroom" }, { name: "Light" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" }] },
  { id: "2", title: "Well-Furnished 1BHK", city: "Sehore", room_type: "1BHK", rent: 2500, is_verified: true, owner: { full_name: "Neha Verma" }, amenities: [{ name: "WiFi" }, { name: "Kitchen" }, { name: "AC" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" }] },
  { id: "3", title: "Cozy Room Near College", city: "Sehore", room_type: "Single Room", rent: 1500, is_verified: true, owner: { full_name: "Rajesh Kumar" }, amenities: [{ name: "Bathroom" }, { name: "Light" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80" }] },
  { id: "4", title: "Shared Hostel Room", city: "Sehore", room_type: "PG/Hostel", rent: 800, is_verified: false, owner: { full_name: "Anit Verma" }, amenities: [{ name: "Kitchen" }, { name: "WiFi" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" }] },
  { id: "5", title: "Budget Student Room", city: "Sehore", room_type: "Single Room", rent: 1200, is_verified: false, owner: { full_name: "Priya Singh" }, amenities: [{ name: "Light" }, { name: "Water" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80" }] },
  { id: "6", title: "Modern 1BHK Apartment", city: "Sehore", room_type: "1BHK", rent: 3500, is_verified: true, owner: { full_name: "Mohan Patel" }, amenities: [{ name: "AC" }, { name: "Kitchen" }, { name: "Balcony" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80" }] },
];

export default function LandingPage() {
  const [budget, setBudget] = useState(2500);
  const [roomTypes, setRoomTypes] = useState([]);
  const navigate = useNavigate();

  const toggleType = (type) => setRoomTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#F0F5FF 0%,#EBF2FF 40%,#F9FAFB 100%)", padding: "72px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 14px", background: "var(--primary-light)", color: "var(--primary)", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 20, border: "1px solid #C3D9FF" }}>
            🏠 Currently serving Sehore · Budget ₹500–₹5,000/month
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "var(--secondary)", lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.5px" }}>
            Find Your Perfect Room<br /><span style={{ color: "var(--primary)" }}>in Sehore</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 36 }}>Budget Rooms from ₹500 to ₹5,000 per month</p>

          {/* Search Box */}
          <div style={{ background: "var(--white)", borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 24px rgba(26,86,219,0.1)", maxWidth: 540, margin: "0 auto", textAlign: "left", border: "1px solid #DCE8FF" }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--secondary)" }}>Monthly Budget</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", background: "var(--primary-light)", padding: "2px 10px", borderRadius: 20 }}>₹{Number(budget).toLocaleString("en-IN")}</span>
              </div>
              <input type="range" min={500} max={5000} step={100} value={budget} onChange={e => setBudget(Number(e.target.value))} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}><span>₹500</span><span>₹5,000</span></div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--secondary)", display: "block", marginBottom: 10 }}>Room Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Single Room", "1BHK", "2BHK", "PG/Hostel"].map(type => (
                  <label key={type} onClick={() => toggleType(type)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${roomTypes.includes(type) ? "var(--primary)" : "var(--border)"}`, background: roomTypes.includes(type) ? "var(--primary-light)" : "var(--white)", cursor: "pointer", fontSize: 13, fontWeight: 500, color: roomTypes.includes(type) ? "var(--primary)" : "var(--text)", transition: "all 0.15s" }}>
                    <input type="checkbox" checked={roomTypes.includes(type)} readOnly style={{ accentColor: "var(--primary)" }} />{type}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={() => navigate("/rooms")} style={{ width: "100%", padding: "13px", background: "var(--primary)", color: "white", border: "none", borderRadius: "var(--radius-btn)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Search Rooms →
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "60px 24px", background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 32 }}>
          {[
            { icon: "📅", title: "Pre-book Online", desc: "Secure your rooms with online booking before you visit the city." },
            { icon: "✅", title: "Verified Owners", desc: "All property owners are verified to ensure safe transactions." },
            { icon: "📍", title: "See Nearby Amenities", desc: "Explore schools, hospitals, and markets near your room." },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center" }}>
              <div style={{ width: 60, height: 60, background: "var(--primary-light)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 26 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--secondary)", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: "64px 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, color: "var(--secondary)", marginBottom: 8 }}>Featured Properties</h2>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>Check out popular rooms available in Sehore right now</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24, marginBottom: 40 }}>
          {FEATURED_ROOMS.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/rooms")} style={{ padding: "12px 32px", background: "var(--white)", color: "var(--primary)", border: "2px solid var(--primary)", borderRadius: "var(--radius-btn)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            View All Properties →
          </button>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#1A56DB,#1645B8)", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "white", marginBottom: 12 }}>Own a Property? List it on Kanelijo</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28, fontSize: 15 }}>Reach thousands of room seekers in Sehore — for free.</p>
        <button onClick={() => navigate("/register")} style={{ padding: "13px 32px", background: "white", color: "var(--primary)", border: "none", borderRadius: "var(--radius-btn)", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Add Your Property →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--secondary)", color: "rgba(255,255,255,0.7)", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>Kanelijo</div>
        <p style={{ fontSize: 13 }}>Find Your Perfect Room Before Visiting · Sehore, MP</p>
        <p style={{ fontSize: 12, marginTop: 16, color: "rgba(255,255,255,0.4)" }}>© 2026 Kanelijo. All rights reserved.</p>
      </footer>
    </div>
  );
}
