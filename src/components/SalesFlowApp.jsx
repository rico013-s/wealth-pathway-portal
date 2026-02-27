import { useState, useEffect, useRef } from "react";

// ==================== CONFIG ====================
// Contul TĂU secret de owner - nu il stie nimeni altcineva
const OWNER_CREDENTIALS = { username: "admin.salesflow", password: "salesflow.owner.2025", name: "SalesFlow AI Owner" };

const SYSTEM_PROMPT = `Esti asistentul virtual de calificare al InvestPro Capital, un broker autorizat ASF Romania specializat in Forex/CFD, Actiuni & ETF-uri si Materii prime.
Vorbesti DOAR in romana. Esti profesionist, cald si concis. Nu pui niciodata mai mult de o intrebare odata.
FLOW: 1)capital 2)experienta 3)sursa fonduri 4)broker existent 5)risc 6)orizont 7)timp zilnic/pasiv 8)varsta 9)scor final
SCORING: Capital:sub1k=+5,1-5k=+20,5-20k=+40,peste20k=+50 | Experienta:fara=+10,incepator=+15,intermediar=+25,avansat=+30 | Sursa:salariu=+10,business=+15,economii=+10,mostenire=+12 | BrokerExistent:da=+10,nu=+5 | Risc:scazut=+5,mediu=+15,ridicat=+20 | Orizont:sub6luni=+5,6-12luni=+15,1-3ani=+20,peste3ani=+10 | Timp:zilnic=+10,pasiv=+8 | Varsta:sub25=+5,25-35=+15,35-50=+20,peste50=+10
HOT>70 | WARM 40-70 | COLD<40
La final afiseaza OBLIGATORIU:
[LEAD_SCORE: X][LEAD_STATUS: HOT/WARM/COLD][LEAD_CAPITAL: suma][LEAD_EXPERIENTA: nivel][LEAD_RISC: nivel][LEAD_ORIZONT: perioada][LEAD_SURSA: sursa]`;

// ==================== HELPERS ====================
const parseLeadData = (t) => ({
  score: parseInt(t.match(/\[LEAD_SCORE:\s*(\d+)\]/)?.[1] || "0"),
  status: t.match(/\[LEAD_STATUS:\s*(HOT|WARM|COLD)\]/)?.[1] || null,
  capital: t.match(/\[LEAD_CAPITAL:\s*([^\]]+)\]/)?.[1] || "—",
  experienta: t.match(/\[LEAD_EXPERIENTA:\s*([^\]]+)\]/)?.[1] || "—",
  risc: t.match(/\[LEAD_RISC:\s*([^\]]+)\]/)?.[1] || "—",
  orizont: t.match(/\[LEAD_ORIZONT:\s*([^\]]+)\]/)?.[1] || "—",
  sursa: t.match(/\[LEAD_SURSA:\s*([^\]]+)\]/)?.[1] || "—",
});
const cleanText = (t) => t.replace(/\[LEAD_[A-Z]+:[^\]]+\]/g, "").trim();
const sc = (score) => score >= 70
  ? { color: "#00A86B", label: "HOT", bg: "#F0FDF4", border: "#BBF7D0" }
  : score >= 40
  ? { color: "#D97706", label: "WARM", bg: "#FFFBEB", border: "#FDE68A" }
  : { color: "#DC2626", label: "COLD", bg: "#FEF2F2", border: "#FECACA" };
const fmt = (ts) => new Date(ts).toLocaleString("ro-RO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const fmtDate = (ts) => new Date(ts).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
const daysLeft = (expiry) => Math.ceil((new Date(expiry) - new Date()) / 86400000);
const isActive = (license) => license && license.active && new Date(license.expiry) > new Date();

const Badge = ({ status }) => {
  const s = sc(status === "HOT" ? 80 : status === "WARM" ? 55 : 20);
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 800 }}>{status}</span>;
};

const Avatar = ({ initials, color = "#0055D4", size = 36 }) => (
  <div style={{ width: size, height: size, minWidth: size, background: `linear-gradient(135deg,${color},${color}BB)`, borderRadius: size * 0.27, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.34 }}>{initials}</div>
);

// ==================== OWNER PANEL ====================
function OwnerPanel({ onLogout }) {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [msg, setMsg] = useState("");
  const [newBroker, setNewBroker] = useState({ companyName: "", adminName: "", username: "", password: "", days: "30" });

  useEffect(() => { loadBrokers(); }, []);

  const loadBrokers = async () => {
    setLoading(true);
    try {
      const r = await window.storage.list("broker:");
      if (r?.keys?.length > 0) {
        const all = await Promise.all(r.keys.map(async k => {
          try { const x = await window.storage.get(k); return x ? JSON.parse(x.value) : null; } catch { return null; }
        }));
        setBrokers(all.filter(Boolean).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else setBrokers([]);
    } catch { setBrokers([]); }
    setLoading(false);
  };

  const addBroker = async () => {
    if (!newBroker.companyName || !newBroker.adminName || !newBroker.username || !newBroker.password) {
      setMsg("⚠️ Completeaza toate campurile."); return;
    }
    const expiry = new Date(Date.now() + parseInt(newBroker.days) * 86400000).toISOString();
    const broker = {
      id: `broker:${Date.now()}`,
      companyName: newBroker.companyName,
      adminName: newBroker.adminName,
      username: newBroker.username,
      password: newBroker.password,
      active: true,
      expiry,
      days: parseInt(newBroker.days),
      createdAt: new Date().toISOString(),
      avatar: newBroker.adminName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
      agents: [],
    };
    try {
      await window.storage.set(broker.id, JSON.stringify(broker));
      setMsg("✅ Broker adaugat cu succes!");
      setNewBroker({ companyName: "", adminName: "", username: "", password: "", days: "30" });
      setShowAdd(false);
      loadBrokers();
    } catch { setMsg("❌ Eroare la salvare."); }
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleBroker = async (broker) => {
    const updated = { ...broker, active: !broker.active };
    try {
      await window.storage.set(broker.id, JSON.stringify(updated));
      setBrokers(b => b.map(x => x.id === broker.id ? updated : x));
    } catch { }
  };

  const renewBroker = async (broker, days) => {
    const newExpiry = new Date(Math.max(new Date(broker.expiry), new Date()) + days * 86400000).toISOString();
    const updated = { ...broker, expiry: newExpiry, active: true };
    try {
      await window.storage.set(broker.id, JSON.stringify(updated));
      setBrokers(b => b.map(x => x.id === broker.id ? updated : x));
      setMsg(`✅ ${broker.companyName} — reinnoit cu ${days} zile!`);
      setTimeout(() => setMsg(""), 3000);
    } catch { }
  };

  const deleteBroker = async (broker) => {
    try {
      await window.storage.delete(broker.id);
      setBrokers(b => b.filter(x => x.id !== broker.id));
    } catch { }
  };

  const active = brokers.filter(b => isActive(b));
  const expired = brokers.filter(b => !isActive(b));
  const revenue = active.length * 99;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", fontFamily: "'DM Sans',sans-serif", color: "#E8F0FF" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#0066FF,#00C896)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, boxShadow: "0 4px 14px rgba(0,102,255,0.3)" }}>S</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>SalesFlow AI</div>
            <div style={{ fontSize: 11, color: "#3D5A7A", letterSpacing: "1px", textTransform: "uppercase" }}>Owner Control Panel</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: "rgba(0,200,150,0.15)", color: "#00C896", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(0,200,150,0.3)" }}>OWNER</span>
          <button onClick={onLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#5B7FA6", borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Iesi</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            ["Brokeri Activi", active.length, "#00C896", "🟢"],
            ["Brokeri Expirati", expired.length, "#E05A5A", "🔴"],
            ["Total Brokeri", brokers.length, "#4A9EFF", "📊"],
            ["Venit Lunar Est.", `${revenue} EUR`, "#F5A623", "💰"],
          ].map(([l, v, c, icon]) => (
            <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>{icon} {l}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: c }}>{v}</div>
            </div>
          ))}
        </div>

        {msg && (
          <div style={{ background: msg.startsWith("✅") ? "rgba(0,200,150,0.1)" : "rgba(224,90,90,0.1)", border: `1px solid ${msg.startsWith("✅") ? "rgba(0,200,150,0.3)" : "rgba(224,90,90,0.3)"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, fontWeight: 600, color: msg.startsWith("✅") ? "#00C896" : "#E05A5A" }}>{msg}</div>
        )}

        {/* Add Broker Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#E8F0FF" }}>Brokeri ({brokers.length})</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={loadBrokers} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#5B7FA6", borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>↺ Refresh</button>
            <button onClick={() => setShowAdd(!showAdd)} style={{ background: showAdd ? "rgba(0,102,255,0.2)" : "linear-gradient(135deg,#0066FF,#0044CC)", border: showAdd ? "1px solid rgba(0,102,255,0.4)" : "none", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: showAdd ? "none" : "0 4px 14px rgba(0,102,255,0.3)" }}>
              {showAdd ? "✕ Anuleaza" : "+ Broker Nou"}
            </button>
          </div>
        </div>

        {/* Add Broker Form */}
        {showAdd && (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid rgba(0,102,255,0.2)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#4A9EFF", marginBottom: 18 }}>Broker Nou</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Companie", "companyName", "ex: TradeMax SRL"], ["Nume Admin", "adminName", "ex: Ion Popescu"], ["Username", "username", "ex: ion.popescu"], ["Parola", "password", "min 8 caractere"]].map(([label, field, ph]) => (
                <div key={field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>{label}</label>
                  <input value={newBroker[field]} onChange={e => setNewBroker(n => ({ ...n, [field]: e.target.value }))} placeholder={ph}
                    type={field === "password" ? "password" : "text"}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 14px", color: "#E8F0FF", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>Durata Licenta</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["30 zile", "30"], ["60 zile", "60"], ["90 zile", "90"], ["365 zile", "365"]].map(([label, val]) => (
                  <button key={val} onClick={() => setNewBroker(n => ({ ...n, days: val }))} style={{ background: newBroker.days === val ? "rgba(0,102,255,0.2)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${newBroker.days === val ? "#4A9EFF" : "rgba(255,255,255,0.1)"}`, color: newBroker.days === val ? "#4A9EFF" : "#5B7FA6", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>
            </div>
            <button onClick={addBroker} style={{ marginTop: 18, background: "linear-gradient(135deg,#0066FF,#0044CC)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 14px rgba(0,102,255,0.3)" }}>
              ✓ Creeaza Cont Broker
            </button>
          </div>
        )}

        {/* Broker List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "#3D5A7A" }}>Se incarca...</div>
        ) : brokers.length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 48, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏢</div>
            <div style={{ fontWeight: 700, color: "#E8F0FF", marginBottom: 6 }}>Niciun broker adaugat inca</div>
            <div style={{ fontSize: 13, color: "#3D5A7A" }}>Adauga primul tau broker client.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {brokers.map(broker => {
              const active = isActive(broker);
              const days = daysLeft(broker.expiry);
              const urgent = active && days <= 5;
              return (
                <div key={broker.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", border: `1.5px solid ${!active ? "rgba(224,90,90,0.2)" : urgent ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={broker.avatar} size={42} color={active ? "#0055D4" : "#64748B"} />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15, color: active ? "#E8F0FF" : "#5B7FA6" }}>{broker.companyName}</div>
                        <div style={{ fontSize: 12, color: "#3D5A7A" }}>@{broker.username} • {broker.adminName}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      {/* Status Badge */}
                      <span style={{ background: active ? "rgba(0,200,150,0.12)" : "rgba(224,90,90,0.12)", border: `1px solid ${active ? "rgba(0,200,150,0.3)" : "rgba(224,90,90,0.3)"}`, color: active ? "#00C896" : "#E05A5A", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>
                        {active ? "ACTIV" : "EXPIRAT"}
                      </span>

                      {/* Days Left */}
                      <span style={{ background: urgent ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${urgent ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.08)"}`, color: urgent ? "#F5A623" : "#5B7FA6", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                        {active ? `${days} zile ramase` : `Expirat ${fmtDate(broker.expiry)}`}
                      </span>

                      {/* Actions */}
                      <button onClick={() => renewBroker(broker, 30)} style={{ background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.25)", color: "#4A9EFF", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>+30 zile</button>
                      <button onClick={() => toggleBroker(broker)} style={{ background: active ? "rgba(224,90,90,0.1)" : "rgba(0,200,150,0.1)", border: `1px solid ${active ? "rgba(224,90,90,0.25)" : "rgba(0,200,150,0.25)"}`, color: active ? "#E05A5A" : "#00C896", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                        {active ? "Blocheaza" : "Activeaza"}
                      </button>
                      <button onClick={() => deleteBroker(broker)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#3D5A7A", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>🗑</button>
                    </div>
                  </div>

                  {/* Expiry Bar */}
                  {active && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: "#3D5A7A" }}>Creat: {fmtDate(broker.createdAt)}</span>
                        <span style={{ fontSize: 11, color: urgent ? "#F5A623" : "#3D5A7A" }}>Expira: {fmtDate(broker.expiry)}</span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, (days / broker.days) * 100))}%`, background: urgent ? "#F5A623" : "linear-gradient(90deg,#0066FF,#00C896)", borderRadius: 4, transition: "width 0.5s" }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 32, padding: "16px 20px", background: "rgba(0,102,255,0.06)", borderRadius: 12, border: "1px solid rgba(0,102,255,0.15)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#4A9EFF", marginBottom: 6 }}>💡 Cum functioneaza</div>
          <div style={{ fontSize: 12, color: "#3D5A7A", lineHeight: 1.8 }}>
            Cand un broker plateste abonamentul, adaugi contul lui aici si setezi durata licentei. El se logheaza cu username-ul si parola create de tine. Cand licenta expira, accesul e blocat automat. Poti reactiva cu un singur click dupa reinnoire.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== BROKER DASHBOARD ====================
function BrokerDashboard({ broker, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const days = daysLeft(broker.expiry);
  const urgent = days <= 5;

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const r = await window.storage.list("lead:");
      if (r?.keys?.length > 0) {
        const all = await Promise.all(r.keys.map(async k => {
          try { const x = await window.storage.get(k); return x ? JSON.parse(x.value) : null; } catch { return null; }
        }));
        setLeads(all.filter(Boolean).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } else setLeads([]);
    } catch { setLeads([]); }
    setLoading(false);
  };

  const filtered = filter === "ALL" ? leads : leads.filter(l => l.status === filter);
  const counts = { HOT: leads.filter(l => l.status === "HOT").length, WARM: leads.filter(l => l.status === "WARM").length, COLD: leads.filter(l => l.status === "COLD").length };

  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials={broker.avatar} size={40} color="#003087" />
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0F172A" }}>{broker.companyName}</div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>Dashboard Leaduri • SalesFlow AI</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ background: urgent ? "#FFFBEB" : "#F0FDF4", border: `1px solid ${urgent ? "#FDE68A" : "#BBF7D0"}`, color: urgent ? "#D97706" : "#00A86B", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
            {urgent ? `⚠️ ${days} zile ramase` : `✓ Activ — ${days} zile`}
          </span>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid #E2E8F0", color: "#94A3B8", borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Iesi</button>
        </div>
      </div>

      {urgent && (
        <div style={{ background: "#FFFBEB", borderBottom: "1px solid #FDE68A", padding: "10px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <span style={{ fontSize: 13, color: "#D97706", fontWeight: 600 }}>Abonamentul expira in {days} zile. Contactati SalesFlow AI pentru reinnoire: markets4all.ro</span>
        </div>
      )}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[["Total", leads.length, "#0055D4"], ["HOT 🔥", counts.HOT, "#00A86B"], ["WARM ⚡", counts.WARM, "#D97706"], ["Medie", leads.length ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0, "#7C3AED"]].map(([l, v, c]) => (
            <div key={l} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: c }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {["ALL", "HOT", "WARM", "COLD"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#0055D4" : "#fff", color: filter === f ? "#fff" : "#64748B", border: `1px solid ${filter === f ? "#0055D4" : "#E2E8F0"}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                  {f === "ALL" ? `Toate (${leads.length})` : `${f} (${counts[f] || 0})`}
                </button>
              ))}
              <button onClick={loadLeads} style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#64748B", borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginLeft: "auto" }}>↺</button>
            </div>

            {loading ? <div style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>Se incarca...</div>
              : filtered.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 14, padding: 48, textAlign: "center", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
                  <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Niciun lead inca</div>
                  <div style={{ fontSize: 13, color: "#94A3B8" }}>Leadurile apar dupa ce clientii completeaza chatbot-ul.</div>
                </div>
              ) : filtered.map(lead => {
                const s = sc(lead.score);
                const sel = selected?.id === lead.id;
                return (
                  <div key={lead.id} onClick={() => setSelected(sel ? null : lead)} style={{ background: "#fff", borderRadius: 12, padding: "13px 16px", border: `1.5px solid ${sel ? "#0055D4" : "#E2E8F0"}`, cursor: "pointer", marginBottom: 8, transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: s.color }}>{lead.score}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>Lead #{lead.id?.split("_")[0]?.slice(-4)}</div>
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>{fmt(lead.timestamp)}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#64748B" }}>{lead.capital}</span>
                        <Badge status={lead.status} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {selected && (() => {
            const s = sc(selected.score);
            return (
              <div style={{ width: 280, minWidth: 280, background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #E2E8F0", height: "fit-content", position: "sticky", top: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#0F172A" }}>Detalii Lead</div>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 18 }}>×</button>
                </div>
                <div style={{ textAlign: "center", background: s.bg, borderRadius: 12, padding: "18px", marginBottom: 14, border: `1px solid ${s.border}` }}>
                  <div style={{ fontSize: 52, fontWeight: 900, color: s.color, lineHeight: 1 }}>{selected.score}</div>
                  <div style={{ marginTop: 8 }}><Badge status={selected.status} /></div>
                </div>
                {[["💰 Capital", selected.capital], ["📈 Experienta", selected.experienta], ["⚡ Risc", selected.risc], ["🕐 Orizont", selected.orizont], ["💼 Sursa", selected.sursa], ["🕒 Data", fmt(selected.timestamp)]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: 12, color: "#64748B" }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", maxWidth: "55%", textAlign: "right" }}>{v}</span>
                  </div>
                ))}
                {selected.status === "HOT" && <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px", marginTop: 12, fontSize: 12, color: "#00A86B", fontWeight: 700 }}>🔥 Contacteaza imediat — sanse maxime!</div>}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ==================== EXPIRED SCREEN ====================
function ExpiredScreen({ broker, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, maxWidth: 440, textAlign: "center", border: "1px solid #E2E8F0", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>⏰</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: "#0F172A", marginBottom: 10 }}>Abonament Expirat</div>
        <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 28 }}>
          Abonamentul <strong>{broker.companyName}</strong> a expirat.<br />Contactati SalesFlow AI pentru reinnoire.
        </div>
        <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Contact reinnoire</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0055D4" }}>markets4all.ro</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid #E2E8F0", color: "#94A3B8", borderRadius: 10, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Inapoi</button>
      </div>
    </div>
  );
}

// ==================== LOGIN ====================
function Login({ onOwnerLogin, onBrokerLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const tryLogin = async () => {
    if (!username || !password) { setError("Completeaza ambele campuri."); return; }
    setLoading(true);

    // Check owner
    if (username === OWNER_CREDENTIALS.username && password === OWNER_CREDENTIALS.password) {
      onOwnerLogin(); setLoading(false); return;
    }

    // Check broker
    try {
      const r = await window.storage.list("broker:");
      if (r?.keys?.length > 0) {
        for (const key of r.keys) {
          try {
            const x = await window.storage.get(key);
            if (x) {
              const broker = JSON.parse(x.value);
              if (broker.username === username && broker.password === password) {
                onBrokerLogin(broker); setLoading(false); return;
              }
            }
          } catch { }
        }
      }
    } catch { }

    setError("Username sau parola incorecta.");
    setTimeout(() => setError(""), 3000);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0A1628,#0D2040)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderRadius: 22, padding: "40px 36px", width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#0066FF,#00C896)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 22, margin: "0 auto 14px", boxShadow: "0 6px 20px rgba(0,102,255,0.3)" }}>S</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0F172A" }}>SalesFlow AI</div>
          <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>Portal Acces</div>
        </div>
        {[["Username", username, setUsername, "text", "ex: mihai.ionescu"], ["Parola", password, setPassword, "password", "••••••••"]].map(([label, val, setter, type, ph]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>{label}</label>
            <input value={val} onChange={e => setter(e.target.value)} onKeyDown={e => e.key === "Enter" && tryLogin()} type={type} placeholder={ph}
              style={{ width: "100%", background: "#F8FAFC", border: `1.5px solid ${error ? "#FCA5A5" : "#E2E8F0"}`, borderRadius: 10, padding: "12px 15px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "#0066FF"} onBlur={e => e.target.style.borderColor = error ? "#FCA5A5" : "#E2E8F0"} />
          </div>
        ))}
        {error && <div style={{ fontSize: 12, color: "#DC2626", marginBottom: 12, fontWeight: 600 }}>{error}</div>}
        <button onClick={tryLogin} disabled={loading} style={{ width: "100%", background: loading ? "#EEF2FF" : "linear-gradient(135deg,#0066FF,#0044CC)", border: "none", color: loading ? "#94A3B8" : "#fff", borderRadius: 11, padding: "13px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: loading ? "none" : "0 6px 18px rgba(0,102,255,0.3)" }}>
          {loading ? "Se verifica..." : "Intra in cont →"}
        </button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "#CBD5E1" }}>markets4all.ro</div>
      </div>
    </div>
  );
}

// ==================== CLIENT CHATBOT ====================
function ClientChatbot({ onGoToLogin }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const saveLead = async (data) => {
    try {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      await window.storage.set(`lead:${id}`, JSON.stringify({ id, ...data, timestamp: new Date().toISOString() }));
      setLeadSaved(true);
    } catch (e) { console.error(e); }
  };

  const startChat = async () => {
    setStarted(true); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: [{ role: "user", content: "Buna ziua, sunt interesat sa investesc." }] })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      setMessages([{ role: "user", content: "Buna ziua, sunt interesat sa investesc.", hidden: true }, { role: "assistant", content: cleanText(text) }]);
    } catch { setMessages([{ role: "assistant", content: "Buna ziua! Bine ati venit la InvestPro Capital. Cum va pot ajuta?" }]); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages.filter(m => !m.hidden), userMsg];
    setMessages(newMessages); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const parsed = parseLeadData(text);
      setMessages([...newMessages, { role: "assistant", content: cleanText(text) }]);
      if (parsed.status && !leadSaved) await saveLead(parsed);
    } catch { setMessages(m => [...m, { role: "assistant", content: "Va rog sa repetati." }]); }
    setLoading(false);
  };

  const visible = messages.filter(m => !m.hidden);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "'DM Sans',sans-serif", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "13px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16 }}>IP</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0D1B3E" }}>InvestPro Capital</div>
            <div style={{ fontSize: 11, color: "#8A9BB8" }}>Consultant Virtual • Autorizat ASF</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C896" }} />
          <span style={{ fontSize: 12, color: "#00A86B", fontWeight: 600 }}>Online</span>
          <button onClick={onGoToLogin} style={{ background: "none", border: "none", color: "#E2E8F0", fontSize: 10, cursor: "pointer" }}>●</button>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 660, width: "100%", margin: "0 auto", padding: "0 16px" }}>
        {!started ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 50, marginBottom: 18 }}>💼</div>
            <h2 style={{ fontSize: 23, fontWeight: 800, color: "#0D1B3E", margin: "0 0 10px" }}>Bun venit la InvestPro Capital</h2>
            <p style={{ color: "#8A9BB8", fontSize: 14, lineHeight: 1.8, maxWidth: 360, margin: "0 0 26px" }}>Consultantul nostru virtual te ghideaza in 5 minute catre cea mai potrivita solutie de investitii.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: 26 }}>
              {["Forex & CFD", "Actiuni & ETF", "Materii Prime", "Autorizat ASF"].map(t => (
                <span key={t} style={{ background: "#EEF2FF", color: "#0055D4", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <button onClick={startChat} style={{ background: "linear-gradient(135deg,#003087,#0055D4)", border: "none", color: "#fff", padding: "14px 34px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(0,48,135,0.28)", fontFamily: "'DM Sans',sans-serif" }}>
              Incepe Consultanta Gratuita →
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 0", display: "flex", flexDirection: "column", gap: 11 }}>
              {visible.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
                  {msg.role === "assistant" && <div style={{ width: 32, height: 32, minWidth: 32, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 12 }}>IP</div>}
                  <div style={{ maxWidth: "74%", padding: "11px 15px", fontSize: 14, lineHeight: 1.65, background: msg.role === "user" ? "linear-gradient(135deg,#003087,#0055D4)" : "#fff", color: msg.role === "user" ? "#fff" : "#1E293B", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", border: msg.role === "user" ? "none" : "1px solid #E2E8F0", boxShadow: msg.role === "user" ? "0 3px 10px rgba(0,48,135,0.18)" : "0 1px 5px rgba(0,0,0,0.05)" }}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 32, height: 32, minWidth: 32, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 12 }}>IP</div>
                  <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#0055D4", animation: `b 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              {leadSaved && <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 11, padding: "11px 15px", display: "flex", alignItems: "center", gap: 8 }}><span>✅</span><span style={{ fontSize: 13, color: "#00A86B", fontWeight: 600 }}>Profilul tau a fost salvat. Un consultant te va contacta curand!</span></div>}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: "12px 0 16px", display: "flex", gap: 9 }}>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Scrieti raspunsul dumneavoastra..."
                style={{ flex: 1, background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: 11, padding: "11px 15px", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                onFocus={e => e.target.style.borderColor = "#0055D4"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? "#EEF2FF" : "linear-gradient(135deg,#003087,#0055D4)", border: "none", borderRadius: 11, width: 46, height: 46, cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontSize: 17, transition: "all 0.2s" }}>→</button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:4px}`}</style>
    </div>
  );
}

// ==================== MAIN ====================
export default function App() {
  const [view, setView] = useState("client");
  const [currentBroker, setCurrentBroker] = useState(null);

  const handleBrokerLogin = (broker) => {
    setCurrentBroker(broker);
    setView(isActive(broker) ? "broker" : "expired");
  };

  if (view === "client") return <ClientChatbot onGoToLogin={() => setView("login")} />;
  if (view === "login") return <Login onOwnerLogin={() => setView("owner")} onBrokerLogin={handleBrokerLogin} />;
  if (view === "owner") return <OwnerPanel onLogout={() => setView("client")} />;
  if (view === "broker" && currentBroker) return <BrokerDashboard broker={currentBroker} onLogout={() => { setCurrentBroker(null); setView("client"); }} />;
  if (view === "expired" && currentBroker) return <ExpiredScreen broker={currentBroker} onLogout={() => { setCurrentBroker(null); setView("client"); }} />;
  return null;
}
