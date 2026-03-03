import { useState } from "react";
import { Link } from "react-router-dom";

const AMENITY_ICONS = { WiFi:"📶", AC:"❄️", Parking:"🅿️", Bathroom:"🚿", Kitchen:"🍳", Balcony:"🌅", Furnished:"🛋️", Gas:"🔥", Light:"💡", Water:"💧" };
const TYPE_COLORS = {
  "Single Room": { bg: "#EBF2FF", color: "#1A56DB" },
  "1BHK": { bg: "#F0FDF4", color: "#059669" },
  "2BHK": { bg: "#FFF7ED", color: "#D97706" },
  "PG/Hostel": { bg: "#FDF4FF", color: "#9333EA" },
};

export default function RoomCard({ room }) {
  const [hovered, setHovered] = useState(false);
  const { id, title, city, room_type, rent, is_verified, owner, room_images = [], amenities = [] } = room;
  const imageUrl = room_images[0]?.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
  const tc = TYPE_COLORS[room_type] || { bg: "#F3F4F6", color: "#374151" };

  return (
    <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        background: "var(--white)", borderRadius: "var(--radius-card)", overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease", cursor: "pointer",
      }}>
        <div style={{ position: "relative", paddingTop: "66.67%", overflow: "hidden" }}>
          <img src={imageUrl} alt={title} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.4s ease",
          }} />
          <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: "var(--radius-badge)", fontSize: 11, fontWeight: 700, background: tc.bg, color: tc.color }}>{room_type}</span>
          {is_verified && (
            <span style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: "var(--radius-badge)", fontSize: 11, fontWeight: 700, background: "#D1FAE5", color: "#10B981" }}>✓ Verified</span>
          )}
        </div>
        <div style={{ padding: "16px 18px 18px" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--secondary)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h3>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>📍 {city}</div>
          {amenities.length > 0 && (
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {amenities.slice(0, 3).map(a => (
                <span key={a.name} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  {AMENITY_ICONS[a.name] || "✦"} {a.name}
                </span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--secondary)" }}>₹{Number(rent).toLocaleString("en-IN")}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>per month</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--primary)" }}>
                {owner?.full_name?.[0] || "O"}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{owner?.full_name || "Owner"}</div>
                <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 500 }}>% Call</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
