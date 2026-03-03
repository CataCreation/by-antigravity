import { useState, useMemo } from "react";
import RoomCard from "../components/RoomCard";

const ALL_ROOMS = [
  { id: "1", title: "Affordable Room for Students", city: "Sehore", room_type: "Single Room", rent: 3000, is_verified: true, owner: { full_name: "Mohan Singh" }, amenities: [{ name: "WiFi" }, { name: "Bathroom" }, { name: "Light" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" }] },
  { id: "2", title: "Well-Furnished 1BHK", city: "Sehore", room_type: "1BHK", rent: 2500, is_verified: true, owner: { full_name: "Neha Verma" }, amenities: [{ name: "WiFi" }, { name: "Kitchen" }, { name: "AC" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" }] },
  { id: "3", title: "Cozy Room Near College", city: "Sehore", room_type: "Single Room", rent: 1500, is_verified: true, owner: { full_name: "Rajesh Kumar" }, amenities: [{ name: "Bathroom" }, { name: "Light" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80" }] },
  { id: "4", title: "Shared Hostel Room", city: "Sehore", room_type: "PG/Hostel", rent: 800, is_verified: false, owner: { full_name: "Anit Verma" }, amenities: [{ name: "Kitchen" }, { name: "WiFi" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" }] },
  { id: "5", title: "Budget Student Room", city: "Sehore", room_type: "Single Room", rent: 1200, is_verified: false, owner: { full_name: "Priya Singh" }, amenities: [{ name: "Light" }, { name: "Water" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80" }] },
  { id: "6", title: "Modern 1BHK Apartment", city: "Sehore", room_type: "1BHK", rent: 3500, is_verified: true, owner: { full_name: "Mohan Patel" }, amenities: [{ name: "AC" }, { name: "Kitchen" }, { name: "Balcony" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80" }] },
  { id: "7", title: "Spacious 2BHK for Family", city: "Sehore", room_type: "2BHK", rent: 4500, is_verified: true, owner: { full_name: "Sunita Rao" }, amenities: [{ name: "AC" }, { name: "Parking" }, { name: "Kitchen" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80" }] },
  { id: "8", title: "Girls PG with Meals", city: "Sehore", room_type: "PG/Hostel", rent: 1800, is_verified: true, owner: { full_name: "Kavita Sharma" }, amenities: [{ name: "WiFi" }, { name: "Kitchen" }, { name: "Light" }], room_images: [{ image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80" }] },
];

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [maxRent, setMaxRent] = useState(5000);
  const [types, setTypes] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("newest");

  const toggleType = t => setTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  const filtered = useMemo(() => {
    let r = ALL_ROOMS.filter(room => {
      if (search && !room.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (room.rent > maxRent) return false;
      if (types.length && !types.includes(room.room_type)) return false;
      if (verifiedOnly && !room.is_verified) return false;
      return true;
    });
    if (sort === "price_asc") r.sort((a, b) => a.rent - b.rent);
    if (sort === "price_desc") r.sort((a, b) => b.rent - a.rent);
    return r;
  }, [search, maxRent, types, verifiedOnly, sort]);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--secondary)" }}>Rooms in Sehore</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 2 }}>{filtered.length} room{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "9px 18px", borderRadius: "var(--radius-btn)", border: "1.5px solid var(--border)", background: showFilters ? "var(--primary-light)" : "var(--white)", color: showFilters ? "var(--primary)" : "var(--text)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            ⚙ Filters {(types.length || verifiedOnly) ? `(${types.length + (verifiedOnly ? 1 : 0)})` : ""}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "9px 14px", borderRadius: "var(--radius-btn)", border: "1.5px solid var(--border)", background: "var(--white)", fontSize: 13, cursor: "pointer", outline: "none" }}>
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..." style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: "var(--radius-input)", border: "1.5px solid var(--border)", fontSize: 14, outline: "none", background: "var(--white)" }} onFocus={e => e.target.style.borderColor="var(--primary)"} onBlur={e => e.target.style.borderColor="var(--border)"} />
      </div>

      {showFilters && (
        <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", padding: "20px 24px", marginBottom: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Max Budget: ₹{maxRent.toLocaleString("en-IN")}</label>
            <input type="range" min={500} max={5000} step={100} value={maxRent} onChange={e => setMaxRent(Number(e.target.value))} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Room Type</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Single Room", "1BHK", "2BHK", "PG/Hostel"].map(t => (
                <button key={t} onClick={() => toggleType(t)} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: `1.5px solid ${types.includes(t) ? "var(--primary)" : "var(--border)"}`, background: types.includes(t) ? "var(--primary-light)" : "var(--white)", color: types.includes(t) ? "var(--primary)" : "var(--muted)" }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Other</label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
              <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} style={{ accentColor: "var(--primary)" }} /> Verified owners only
            </label>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--secondary)", marginBottom: 8 }}>No rooms found</h3>
          <p style={{ fontSize: 14 }}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
          {filtered.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      )}
    </div>
  );
}
