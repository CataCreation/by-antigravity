import { useState } from "react";
import { Link } from "react-router-dom";

const MOCK_ROOMS = [
  { id:"1", title:"Affordable Room for Students", city:"Sehore", rent:3000, is_active:true, is_verified:true, room_type:"Single Room" },
  { id:"6", title:"Modern 1BHK Apartment", city:"Sehore", rent:3500, is_active:true, is_verified:false, room_type:"1BHK" },
];
const MOCK_BOOKINGS = [
  { id:"b1", room:"Affordable Room for Students", seeker:"Priya Singh", start:"2026-03-10", end:"2026-04-10", status:"confirmed", amount:3000 },
  { id:"b2", room:"Affordable Room for Students", seeker:"Ravi Kumar", start:"2026-04-15", end:"2026-05-15", status:"pending", amount:3000 },
];
const STATUS = { confirmed:{bg:"var(--success-light)",c:"var(--success)"}, pending:{bg:"var(--warning-light)",c:"var(--warning)"}, cancelled:{bg:"var(--danger-light)",c:"var(--danger)"}, completed:{bg:"#F3F4F6",c:"var(--muted)"} };

export default function OwnerDashboard({ user }) {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px 60px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:700, color:"var(--secondary)", marginBottom:4 }}>Dashboard</h1>
          <p style={{ fontSize:14, color:"var(--muted)" }}>Welcome back, {user?.full_name || "Owner"} 👋</p>
        </div>
        <Link to="/" style={{ padding:"10px 20px", background:"var(--primary)", color:"white", borderRadius:"var(--radius-btn)", textDecoration:"none", fontSize:14, fontWeight:600 }}>+ Add Room</Link>
      </div>

      <div style={{ display:"flex", gap:4, marginBottom:28, borderBottom:"1px solid var(--border)" }}>
        {["overview","rooms","bookings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 18px", border:"none", background:"none", fontSize:14, fontWeight:tab===t?600:500, color:tab===t?"var(--primary)":"var(--muted)", cursor:"pointer", borderBottom:`2px solid ${tab===t?"var(--primary)":"transparent"}`, marginBottom:-1, textTransform:"capitalize", transition:"all 0.15s" }}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:32 }}>
            {[{label:"Active Listings",v:2,icon:"🏠",c:"var(--primary)"},{label:"Total Bookings",v:2,icon:"📋",c:"var(--success)"},{label:"Pending",v:1,icon:"⏳",c:"var(--warning)"},{label:"Inquiries",v:7,icon:"💬",c:"#9333EA"}].map(s => (
              <div key={s.label} style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--radius-card)", padding:20, boxShadow:"var(--shadow-card)" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:28, fontWeight:700, color:s.c, lineHeight:1, marginBottom:4 }}>{s.v}</div>
                <div style={{ fontSize:13, color:"var(--muted)", fontWeight:500 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"var(--white)", borderRadius:"var(--radius-card)", border:"1px solid var(--border)", overflow:"hidden" }}>
            <div style={{ padding:"18px 24px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between" }}>
              <div style={{ fontSize:15, fontWeight:700, color:"var(--secondary)" }}>Recent Bookings</div>
              <button onClick={() => setTab("bookings")} style={{ fontSize:13, color:"var(--primary)", background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>View all →</button>
            </div>
            {MOCK_BOOKINGS.map((b,i) => (
              <div key={b.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 24px", borderBottom:i<MOCK_BOOKINGS.length-1?"1px solid var(--border)":"none", flexWrap:"wrap", gap:10 }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--secondary)", marginBottom:2 }}>{b.seeker}</div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>{b.room}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"var(--secondary)" }}>₹{b.amount.toLocaleString("en-IN")}</div>
                  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:STATUS[b.status]?.bg, color:STATUS[b.status]?.c }}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "rooms" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {MOCK_ROOMS.map(room => (
            <div key={room.id} style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--radius-card)", padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, flexWrap:"wrap" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--secondary)" }}>{room.title}</div>
                  <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:room.is_active?"var(--success-light)":"var(--danger-light)", color:room.is_active?"var(--success)":"var(--danger)", fontWeight:600 }}>{room.is_active?"Active":"Inactive"}</span>
                  {!room.is_verified && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:"var(--warning-light)", color:"var(--warning)", fontWeight:600 }}>Pending Verification</span>}
                </div>
                <div style={{ fontSize:13, color:"var(--muted)" }}>{room.room_type} · {room.city} · ₹{room.rent.toLocaleString("en-IN")}/mo</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Link to={`/rooms/${room.id}`} style={{ padding:"7px 14px", borderRadius:"var(--radius-btn)", fontSize:13, fontWeight:500, color:"var(--primary)", border:"1px solid var(--primary-light)", background:"var(--primary-light)", textDecoration:"none" }}>View</Link>
                <button style={{ padding:"7px 14px", borderRadius:"var(--radius-btn)", fontSize:13, fontWeight:500, color:"var(--text)", border:"1px solid var(--border)", background:"var(--white)", cursor:"pointer" }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "bookings" && (
        <div style={{ background:"var(--white)", borderRadius:"var(--radius-card)", border:"1px solid var(--border)", overflow:"hidden" }}>
          {MOCK_BOOKINGS.map((b,i) => (
            <div key={b.id} style={{ padding:"16px 22px", borderBottom:i<MOCK_BOOKINGS.length-1?"1px solid var(--border)":"none", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:"var(--secondary)", marginBottom:3 }}>{b.seeker}</div>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:2 }}>{b.room}</div>
                <div style={{ fontSize:11, color:"var(--muted)" }}>{b.start} → {b.end}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:"var(--secondary)" }}>₹{b.amount.toLocaleString("en-IN")}</div>
                  <span style={{ padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:600, background:STATUS[b.status]?.bg, color:STATUS[b.status]?.c }}>{b.status}</span>
                </div>
                {b.status==="pending" && (
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={{ padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:"var(--success)", color:"white", border:"none", cursor:"pointer" }}>Confirm</button>
                    <button style={{ padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:"var(--danger-light)", color:"var(--danger)", border:"none", cursor:"pointer" }}>Decline</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
