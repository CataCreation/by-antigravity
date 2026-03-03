import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Input({ label, type="text", value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ fontSize:12, fontWeight:600, color:"var(--muted)", display:"block", marginBottom:5, textTransform:"uppercase" }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width:"100%", padding:"11px 14px", borderRadius:"var(--radius-input)", border:`1.5px solid ${focused?"var(--primary)":"var(--border)"}`, boxShadow:focused?"0 0 0 3px rgba(26,86,219,0.1)":"none", fontSize:14, outline:"none", background:"var(--white)", transition:"all 0.2s", fontFamily:"var(--font-body)" }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  );
}

export function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:"", password:"" });
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div style={{ minHeight:"calc(100vh - 64px)", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#F0F5FF,#F9FAFB)", padding:24 }}>
      <div style={{ width:"100%", maxWidth:420, background:"var(--white)", borderRadius:"var(--radius-card)", padding:40, boxShadow:"0 4px 24px rgba(26,86,219,0.08)", border:"1px solid #DCE8FF" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:48, height:48, background:"var(--primary)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, color:"white" }}>K</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, color:"var(--secondary)", marginBottom:6 }}>Welcome back</h1>
          <p style={{ fontSize:13, color:"var(--muted)" }}>Sign in to your Kanelijo account</p>
        </div>
        <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        <Input label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" />
        <div style={{ textAlign:"right", marginBottom:20, marginTop:-8 }}>
          <span style={{ fontSize:12, color:"var(--primary)", cursor:"pointer", fontWeight:500 }}>Forgot password?</span>
        </div>
        <button onClick={() => { onLogin({ full_name:"Mohan Singh", user_type:"owner", email:form.email }); navigate("/dashboard"); }}
          style={{ width:"100%", padding:13, background:"var(--primary)", color:"white", border:"none", borderRadius:"var(--radius-btn)", fontSize:15, fontWeight:600, cursor:"pointer", marginBottom:20 }}>
          Sign In
        </button>
        <p style={{ textAlign:"center", fontSize:13, color:"var(--muted)" }}>
          Don't have an account? <Link to="/register" style={{ color:"var(--primary)", fontWeight:600, textDecoration:"none" }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}

export function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name:"", email:"", phone:"", password:"", user_type:"seeker" });
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div style={{ minHeight:"calc(100vh - 64px)", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#F0F5FF,#F9FAFB)", padding:24 }}>
      <div style={{ width:"100%", maxWidth:420, background:"var(--white)", borderRadius:"var(--radius-card)", padding:40, boxShadow:"0 4px 24px rgba(26,86,219,0.08)", border:"1px solid #DCE8FF" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:48, height:48, background:"var(--primary)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, color:"white" }}>K</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, color:"var(--secondary)", marginBottom:6 }}>Create account</h1>
          <p style={{ fontSize:13, color:"var(--muted)" }}>Join Kanelijo — it's free</p>
        </div>
        <Input label="Full Name" value={form.full_name} onChange={set("full_name")} placeholder="Your full name" />
        <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        <Input label="Phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 9876543210" />
        <Input label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Min. 8 characters" />
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:12, fontWeight:600, color:"var(--muted)", display:"block", marginBottom:8, textTransform:"uppercase" }}>I am a</label>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{v:"seeker",l:"🔍 Room Seeker",d:"Looking for a room"},{v:"owner",l:"🏠 Room Owner",d:"I have rooms to list"}].map(r => (
              <div key={r.v} onClick={() => setForm(p => ({...p, user_type:r.v}))} style={{ padding:"12px 14px", borderRadius:10, border:`2px solid ${form.user_type===r.v?"var(--primary)":"var(--border)"}`, background:form.user_type===r.v?"var(--primary-light)":"var(--white)", cursor:"pointer", transition:"all 0.15s" }}>
                <div style={{ fontSize:13, fontWeight:600, color:form.user_type===r.v?"var(--primary)":"var(--secondary)" }}>{r.l}</div>
                <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { onLogin({...form, id:Date.now().toString()}); navigate(form.user_type==="owner"?"/dashboard":"/rooms"); }}
          style={{ width:"100%", padding:13, background:"var(--primary)", color:"white", border:"none", borderRadius:"var(--radius-btn)", fontSize:15, fontWeight:600, cursor:"pointer", marginBottom:20 }}>
          Create Account →
        </button>
        <p style={{ textAlign:"center", fontSize:13, color:"var(--muted)" }}>
          Already have an account? <Link to="/login" style={{ color:"var(--primary)", fontWeight:600, textDecoration:"none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
