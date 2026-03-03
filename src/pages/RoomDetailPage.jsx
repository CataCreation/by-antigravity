import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const ROOMS_DATA = {
  "1": { id:"1", title:"Affordable Room for Students", description:"Budget-friendly single room in student area with basic amenities. Walking distance to college.", city:"Sehore", address:"Near College Campus, Sehore, MP", room_type:"Single Room", rent:3000, deposit:6000, available_from:"2026-03-10", is_verified:true, owner:{ full_name:"Mohan Singh", phone:"+91 9876543212" }, amenities:[{name:"WiFi"},{name:"Bathroom"},{name:"Gas"},{name:"Light"}], nearby:["College Campus","Hospital","Market"], room_images:[{image_url:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"},{image_url:"https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"}] },
  "2": { id:"2", title:"Well-Furnished 1BHK", description:"Completely furnished 1BHK with premium furniture and appliances.", city:"Sehore", address:"Main Market Road, Sehore, MP", room_type:"1BHK", rent:2500, deposit:5000, available_from:"2026-03-15", is_verified:true, owner:{ full_name:"Neha Verma", phone:"+91 9876543213" }, amenities:[{name:"WiFi"},{name:"Kitchen"},{name:"AC"}], nearby:["Market","Bus Stand"], room_images:[{image_url:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"}] },
};

const AMENITY_ICONS = { WiFi:"📶", AC:"❄️", Parking:"🅿️", Bathroom:"🚿", Kitchen:"🍳", Balcony:"🌅", Furnished:"🛋️", Gas:"🔥", Light:"💡", Water:"💧" };
const TYPE_COLORS = { "Single Room":{bg:"#EBF2FF",color:"#1A56DB"}, "1BHK":{bg:"#F0FDF4",color:"#059669"}, "2BHK":{bg:"#FFF7ED",color:"#D97706"}, "PG/Hostel":{bg:"#FDF4FF",color:"#9333EA"} };

export default function RoomDetailPage() {
  const { id } = useParams();
  const room = ROOMS_DATA[id] || ROOMS_DATA["1"];
  const [activeImage, setActiveImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const tc = TYPE_COLORS[room.room_type] || { bg:"#F3F4F6", color:"#374151" };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 60px" }}>
      <Link to="/rooms" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:500, color:"var(--muted)", textDecoration:"none", marginBottom:24 }}>← Back to Listings</Link>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:32, alignItems:"start" }}>
        <div>
          <div style={{ borderRadius:"var(--radius-card)", overflow:"hidden", marginBottom:12 }}>
            <img src={room.room_images[activeImage]?.image_url} alt={room.title} style={{ width:"100%", height:360, objectFit:"cover", display:"block" }} />
          </div>
          {room.room_images.length > 1 && (
            <div style={{ display:"flex", gap:10, marginBottom:24 }}>
              {room.room_images.map((img, i) => (
                <div key={i} onClick={() => setActiveImage(i)} style={{ width:80, height:60, borderRadius:8, overflow:"hidden", cursor:"pointer", border:`2px solid ${activeImage===i?"var(--primary)":"transparent"}`, flexShrink:0 }}>
                  <img src={img.image_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
            <span style={{ padding:"4px 10px", borderRadius:"var(--radius-badge)", fontSize:12, fontWeight:600, background:tc.bg, color:tc.color }}>{room.room_type}</span>
            {room.is_verified && <span style={{ padding:"4px 10px", borderRadius:"var(--radius-badge)", fontSize:12, fontWeight:600, background:"#D1FAE5", color:"#10B981" }}>✓ Verified</span>}
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:700, color:"var(--secondary)", marginBottom:6 }}>{room.title}</h1>
          <div style={{ fontSize:14, color:"var(--muted)", marginBottom:20 }}>📍 {room.address}</div>

          <div style={{ padding:"16px 20px", background:"var(--primary-light)", borderRadius:12, marginBottom:24, display:"flex", gap:32, flexWrap:"wrap" }}>
            <div><div style={{ fontSize:12, color:"var(--primary)", fontWeight:600, marginBottom:2 }}>Monthly Rent</div><div style={{ fontSize:24, fontWeight:700, color:"var(--secondary)" }}>₹{room.rent.toLocaleString("en-IN")}</div></div>
            <div style={{ borderLeft:"1px solid #C3D9FF", paddingLeft:32 }}><div style={{ fontSize:12, color:"var(--primary)", fontWeight:600, marginBottom:2 }}>Security Deposit</div><div style={{ fontSize:24, fontWeight:700, color:"var(--secondary)" }}>₹{room.deposit.toLocaleString("en-IN")}</div></div>
          </div>

          <div style={{ marginBottom:24 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:"var(--secondary)", marginBottom:10 }}>About the Room</h2>
            <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.7 }}>{room.description}</p>
          </div>
          <div style={{ marginBottom:24 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:"var(--secondary)", marginBottom:10 }}>Amenities</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {room.amenities.map(a => <span key={a.name} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", borderRadius:8, border:"1px solid var(--border)", background:"var(--white)", fontSize:13, fontWeight:500 }}>{AMENITY_ICONS[a.name]||"✦"} {a.name}</span>)}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize:16, fontWeight:700, color:"var(--secondary)", marginBottom:10 }}>Nearby Places</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {room.nearby.map(p => <span key={p} style={{ padding:"5px 13px", borderRadius:20, background:"var(--bg)", border:"1px solid var(--border)", fontSize:12, color:"var(--muted)", fontWeight:500 }}>📍 {p}</span>)}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div style={{ position:"sticky", top:80, background:"var(--white)", borderRadius:"var(--radius-card)", border:"1px solid var(--border)", boxShadow:"var(--shadow-card)", padding:24 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:"var(--secondary)", marginBottom:14 }}>Contact Owner</h3>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, padding:"10px 12px", background:"var(--bg)", borderRadius:10 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"var(--primary)", flexShrink:0 }}>{room.owner.full_name[0]}</div>
            <div>
              <div style={{ fontSize:10, color:"var(--muted)" }}>Owner Name</div>
              <div style={{ fontSize:14, fontWeight:600, color:"var(--secondary)" }}>{room.owner.full_name}</div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
            <a href={`tel:${room.owner.phone}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:12, background:"var(--primary)", color:"white", borderRadius:"var(--radius-btn)", textDecoration:"none", fontSize:14, fontWeight:600 }}>📞 Call Owner</a>
            <a href={`https://wa.me/${room.owner.phone.replace(/\D/g,"")}?text=Hi, I am interested in: ${room.title}`} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:12, background:"#25D366", color:"white", borderRadius:"var(--radius-btn)", textDecoration:"none", fontSize:14, fontWeight:600 }}>💬 WhatsApp Owner</a>
            <button onClick={() => setBookingOpen(true)} style={{ padding:12, background:"var(--white)", color:"var(--secondary)", border:"1.5px solid var(--border)", borderRadius:"var(--radius-btn)", fontSize:14, fontWeight:600, cursor:"pointer" }}>📋 Book Room</button>
          </div>
          <div style={{ borderTop:"1px solid var(--border)", paddingTop:14 }}>
            <div style={{ fontSize:11, color:"var(--muted)", fontWeight:600, marginBottom:6 }}>Contact Information</div>
            <div style={{ fontSize:12, color:"var(--text)", marginBottom:3 }}>📞 {room.owner.phone}</div>
            <div style={{ fontSize:12, color:"var(--text)" }}>✉️ support@kanelijo.com</div>
          </div>
        </div>
      </div>

      {bookingOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:24 }} onClick={() => setBookingOpen(false)}>
          <div style={{ background:"var(--white)", borderRadius:"var(--radius-card)", padding:28, width:"100%", maxWidth:400 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--secondary)", marginBottom:5 }}>Book this Room</h3>
            <p style={{ fontSize:12, color:"var(--muted)", marginBottom:22 }}>{room.title}</p>
            {["Move-in Date","Move-out Date"].map(l => (
              <div key={l} style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"var(--muted)", display:"block", marginBottom:5, textTransform:"uppercase" }}>{l}</label>
                <input type="date" style={{ width:"100%", padding:"10px 12px", borderRadius:"var(--radius-input)", border:"1.5px solid var(--border)", fontSize:14, outline:"none" }} onFocus={e => e.target.style.borderColor="var(--primary)"} onBlur={e => e.target.style.borderColor="var(--border)"} />
              </div>
            ))}
            <button style={{ width:"100%", padding:12, background:"var(--primary)", color:"white", border:"none", borderRadius:"var(--radius-btn)", fontSize:14, fontWeight:600, cursor:"pointer", marginBottom:8 }}>Confirm Booking</button>
            <button onClick={() => setBookingOpen(false)} style={{ width:"100%", padding:10, background:"none", border:"none", color:"var(--muted)", fontSize:13, cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
