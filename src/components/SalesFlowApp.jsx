import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// ==================== CONFIG ====================
const OWNER_CREDENTIALS = { username: "admin.salesflow", password: "salesflow.owner.2025", name: "SalesFlow AI Owner" };

// ==================== ADAPTIVE SYSTEM PROMPT ====================
const buildSystemPrompt = (brokerConfig = {}) => {
  const produse = brokerConfig.produse || ["Forex/CFD", "Actiuni & ETF-uri", "Materii prime"];
  const capitalMin = brokerConfig.capitalMin || "1.000 EUR";
  const pragHot = brokerConfig.pragHot || 70;
  const pragWarm = brokerConfig.pragWarm || 40;

  return `Esti un consultant virtual de investitii al ${brokerConfig.companyName || "InvestPro Capital"}.
Specializare: ${produse.join(", ")}.

MISIUNEA TA PRINCIPALA: Califica prospectul prin conversatie naturala si adaptiva. Vorbesti DOAR in romana. Esti cald, profesionist si empatic. Nu pui niciodata mai mult de o intrebare odata.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW ADAPTIV — REGULI STRICTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTREBAREA 1 — CAPITAL (intotdeauna prima)
Intreaba: "Ca sa iti pot oferi cele mai potrivite optiuni, as vrea sa stiu — cam ce suma ai in vedere pentru investitii in acest moment?"
→ Daca raspunde SUB 1.000 EUR: Raspunde empatic: "Inteleg, fiecare inceput este important. Hai sa vedem ce optiuni se potrivesc pentru tine." Continua cu ton educativ si cald. Scorul capital = 5.
→ Daca raspunde 1.000 - 10.000 EUR: Raspunde pozitiv: "O suma buna cu care poti incepe concret." Continua normal. Scorul capital = 20-35.
→ Daca raspunde PESTE 10.000 EUR: Raspunde cu entuziasm profesionist: "Excelent, cu aceasta suma ai acces la o gama larga de strategii." Continua cu ton mai tehnic. Scorul capital = 40-50.

INTREBAREA 2 — EXPERIENTA (adaptata dupa capital)
→ Daca capital MIC: "Ai mai investit bani inainte, fie si sume mici, sau ar fi prima data?"
→ Daca capital MEDIU/MARE: "Ce experienta ai cu pietele financiare pana acum — esti la inceput sau ai mai tranzactionat?"
Scoruri: fara=+10, incepator=+15, intermediar=+25, avansat=+30

INTREBAREA 3 — BROKER EXISTENT (adaptata dupa experienta)
→ Daca FARA experienta: Sari aceasta intrebare complet. Nu are sens. Scor implicit = 5.
→ Daca ARE experienta: "Ai deja un cont deschis la un broker sau cauti o platforma noua?"
Scoruri: da=+10, nu=+5

INTREBAREA 4 — OBIECTIV PRINCIPAL
→ Daca capital MIC + fara experienta: "Ce te-a determinat sa te gandesti la investitii acum? Ce iti doresti sa obtii?"
→ Daca capital MEDIU + experienta: "Care este obiectivul tau principal — venit pasiv lunar, cresterea capitalului pe termen lung sau diversificarea portofoliului?"
→ Daca capital MARE + experienta avansata: "Ai un obiectiv specific de randament in minte sau o strategie de alocare pe care vrei sa o implementezi?"
Scoruri: venit_pasiv=+15, crestere_capital=+20, diversificare=+15, pensie=+12, speculativ=+18

INTREBAREA 5 — TIMP DISPONIBIL (adaptata dupa obiectiv)
→ Daca obiectiv VENIT PASIV sau PENSIE: "Preferi o abordare mai pasiva, unde investitia lucreaza pentru tine fara sa fii nevoit sa urmaresti zilnic, sau iti place sa fii activ implicat?"
→ Daca obiectiv CRESTERE/SPECULATIV: "Ai timp sa urmaresti pietele zilnic sau preferi strategii care nu necesita monitorizare constanta?"
Scoruri: activ_zilnic=+10, pasiv=+8

INTREBAREA 6 — TOLERANTA RISC (adaptata dupa tot contextul)
→ Daca capital MIC + fara experienta: "Stiu ca poate suna tehnic, dar daca ti-as spune ca exista sansa sa pierzi o parte din suma investita, cum te-ai simti? Preferi siguranta sau esti dispus sa iti asumi un risc pentru randamente mai mari?"
→ Daca capital MEDIU + experienta intermediara: "Care este apetitul tau pentru risc — preferi investitii mai conservatoare cu randamente stabile sau esti deschis la volatilitate pentru profituri mai mari?"
→ Daca capital MARE + experienta avansata: "Cum iti structurezi de obicei expunerea la risc — ai un procent definit pentru pozitii speculative versus pozitii defensive?"
Scoruri: risc_scazut=+5, risc_mediu=+15, risc_ridicat=+20

INTREBAREA 7 — ORIZONT TIMP (adaptata dupa risc si obiectiv)
→ Daca RISC SCAZUT sau PENSIE: "Pe ce perioada ai in vedere sa lasi banii investiti — gandesti pe termen scurt, mediu sau lung?"
→ Daca RISC RIDICAT + SPECULATIV: "Ai un target de timp pentru aceste pozitii sau esti flexibil in functie de evolutia pietei?"
→ Default: "In cat timp ai vrea sa vezi rezultate concrete sau ai flexibilitate in privinta orizontului de investitie?"
Scoruri: sub_6luni=+5, 6_12luni=+15, 1_3ani=+20, peste_3ani=+10

INTREBAREA 8 — VARSTA (intotdeauna ultima, formulare neutra)
"Ca sa iti recomand produsele cele mai potrivite profilului tau, in ce grupa de varsta te incadrezi — sub 25, intre 25-35, 35-50 sau peste 50 de ani?"
Scoruri: sub25=+5, 25_35=+15, 35_50=+20, peste50=+10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TONURI DE COMUNICARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFIL INCEPATOR (capital mic + fara experienta):
- Foloseste limbaj simplu, fara jargon financiar
- Explica termenii pe scurt cand ii folosesti
- Fii incurajator, nu intimidant

PROFIL INTERMEDIAR (capital mediu + ceva experienta):
- Limbaj echilibrat, profesionist dar accesibil
- Mentioneaza instrumente specifice cand e relevant

PROFIL AVANSAT (capital mare + experienta):
- Limbaj tehnic, direct, fara explicatii de baza
- Mentioneaza strategii, instrumente, piete specifice

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CALCULUL SCORULUI FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aduna toate scorurile obtinute. Daca intrebarea 3 a fost sarita, adauga automat 5 puncte.

CLASIFICARE:
- HOT: scor peste ${pragHot} — prospect serios, contacteaza imediat
- WARM: scor ${pragWarm}-${pragHot} — potential, necesita nurturing
- COLD: sub ${pragWarm} — necalificat momentan

MESAJUL FINAL catre prospect:
→ HOT: "Pe baza discutiei noastre, profilul tau se potriveste foarte bine cu ce oferim. Un consultant senior te va contacta in maximum 2 ore pentru a discuta concret optiunile disponibile pentru tine."
→ WARM: "Multumesc pentru raspunsuri! Am identificat cateva optiuni interesante pentru profilul tau. Un consultant te va contacta in urmatoarele 24 de ore."
→ COLD (capital sub ${capitalMin}): "Multumesc pentru interes! Momentan produsele noastre sunt optimizate pentru sume mai mari, dar te invitam sa revii cand esti pregatit. Intre timp, iti putem trimite materiale educationale gratuite."

Afiseaza OBLIGATORIU la final, pe linii separate:
[LEAD_SCORE: X]
[LEAD_STATUS: HOT/WARM/COLD]
[LEAD_CAPITAL: suma exacta]
[LEAD_EXPERIENTA: nivelul]
[LEAD_RISC: nivelul]
[LEAD_ORIZONT: perioada]
[LEAD_SURSA: sursa fondurilor daca a mentionat, altfel N/A]
[LEAD_OBIECTIV: obiectivul principal]
[LEAD_PROFIL: INCEPATOR/INTERMEDIAR/AVANSAT]`;
};

// ==================== HELPERS ====================
const parseLeadData = (t) => ({
  score: parseInt(t.match(/\[LEAD_SCORE:\s*(\d+)\]/)?.[1] || "0"),
  status: t.match(/\[LEAD_STATUS:\s*(HOT|WARM|COLD)\]/)?.[1] || null,
  capital: t.match(/\[LEAD_CAPITAL:\s*([^\]]+)\]/)?.[1] || "—",
  experienta: t.match(/\[LEAD_EXPERIENTA:\s*([^\]]+)\]/)?.[1] || "—",
  risc: t.match(/\[LEAD_RISC:\s*([^\]]+)\]/)?.[1] || "—",
  orizont: t.match(/\[LEAD_ORIZONT:\s*([^\]]+)\]/)?.[1] || "—",
  sursa: t.match(/\[LEAD_SURSA:\s*([^\]]+)\]/)?.[1] || "—",
  obiectiv: t.match(/\[LEAD_OBIECTIV:\s*([^\]]+)\]/)?.[1] || "—",
  profil: t.match(/\[LEAD_PROFIL:\s*([^\]]+)\]/)?.[1] || "—",
});
const cleanText = (t) => t.replace(/\[LEAD_[A-Z_]+:[^\]]+\]/g, "").trim();
const sc = (score) => score >= 70
  ? { color: "#00A86B", label: "HOT", bg: "#F0FDF4", border: "#BBF7D0" }
  : score >= 40
  ? { color: "#D97706", label: "WARM", bg: "#FFFBEB", border: "#FDE68A" }
  : { color: "#DC2626", label: "COLD", bg: "#FEF2F2", border: "#FECACA" };
const fmt = (ts) => new Date(ts).toLocaleString("ro-RO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const fmtDate = (ts) => new Date(ts).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });

const Badge = ({ status }) => {
  const s = sc(status === "HOT" ? 80 : status === "WARM" ? 55 : 20);
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 800, fontFamily: "'DM Sans',sans-serif" }}>{status}</span>;
};

const ProfileBadge = ({ profil }) => {
  const colors = { INCEPATOR: ["#EDE9FE", "#6D28D9", "#DDD6FE"], INTERMEDIAR: ["#EFF6FF", "#1D4ED8", "#BFDBFE"], AVANSAT: ["#FEF3C7", "#D97706", "#FDE68A"] };
  const [bg, color, border] = colors[profil] || ["#F1F5F9", "#64748B", "#E2E8F0"];
  return <span style={{ background: bg, border: `1px solid ${border}`, color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>{profil}</span>;
};

const Avatar = ({ initials, color = "#0055D4", size = 36 }) => (
  <div style={{ width: size, height: size, minWidth: size, background: `linear-gradient(135deg,${color},${color}BB)`, borderRadius: size * 0.27, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.34, fontFamily: "'DM Sans',sans-serif" }}>{initials}</div>
);

// ==================== EDGE FUNCTION HELPER ====================
const callEdgeFunction = async (payload) => {
  const { data, error } = await supabase.functions.invoke('salesflow-chat', {
    body: payload,
  });
  if (error) throw error;
  return data;
};

// ==================== OWNER PANEL ====================
function OwnerPanel({ onLogout }) {
  const [brokers, setBrokers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [msg, setMsg] = useState("");
  const [newBroker, setNewBroker] = useState({ companyName: "", adminName: "", username: "", password: "", days: "30", produse: [], capitalMin: "1.000 EUR", pragHot: "70", pragWarm: "40" });
  const [activeTab, setActiveTab] = useState("brokers");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: brokersData } = await supabase.from('salesflow_brokers').select('*').order('created_at', { ascending: false });
      setBrokers(brokersData || []);
      const { data: leadsData } = await supabase.from('salesflow_leads').select('*').order('created_at', { ascending: false });
      setLeads(leadsData || []);
    } catch { }
    setLoading(false);
  };

  const addBroker = async () => {
    if (!newBroker.companyName || !newBroker.adminName || !newBroker.username || !newBroker.password) {
      setMsg("⚠️ Completeaza toate campurile obligatorii."); return;
    }
    const expiry = new Date(Date.now() + parseInt(newBroker.days) * 86400000).toISOString();
    const { error } = await supabase.from('salesflow_brokers').insert({
      company_name: newBroker.companyName,
      admin_name: newBroker.adminName,
      username: newBroker.username,
      password: newBroker.password,
      active: true,
      expiry,
      days: parseInt(newBroker.days),
      config: { produse: newBroker.produse, capitalMin: newBroker.capitalMin, pragHot: parseInt(newBroker.pragHot), pragWarm: parseInt(newBroker.pragWarm) },
    });
    if (error) { setMsg("❌ Eroare la salvare."); } else {
      setMsg("✅ Broker adaugat cu succes!");
      setNewBroker({ companyName: "", adminName: "", username: "", password: "", days: "30", produse: [], capitalMin: "1.000 EUR", pragHot: "70", pragWarm: "40" });
      setShowAdd(false);
      loadData();
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const toggleBroker = async (broker) => {
    await supabase.from('salesflow_brokers').update({ active: !broker.active }).eq('id', broker.id);
    setBrokers(b => b.map(x => x.id === broker.id ? { ...x, active: !x.active } : x));
  };

  const deleteBroker = async (broker) => {
    await supabase.from('salesflow_brokers').delete().eq('id', broker.id);
    setBrokers(b => b.filter(x => x.id !== broker.id));
  };

  const activeBrokers = brokers.filter(b => b.active && new Date(b.expiry) > new Date());
  const PRODUSE_OPTIONS = ["Forex/CFD", "Actiuni & ETF-uri", "Materii prime", "Asigurari de viata", "Fonduri de investitii", "Criptomonede", "Obligatiuni"];

  const leadCounts = { HOT: leads.filter(l => l.status === "HOT").length, WARM: leads.filter(l => l.status === "WARM").length, COLD: leads.filter(l => l.status === "COLD").length };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", fontFamily: "'DM Sans',sans-serif", color: "#E8F0FF" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#0066FF,#00C896)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18 }}>S</div>
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
          {[["Brokeri Activi", activeBrokers.length, "#00C896"], ["Total Leaduri", leads.length, "#4A9EFF"], ["Leaduri HOT 🔥", leadCounts.HOT, "#00A86B"], ["Leaduri WARM ⚡", leadCounts.WARM, "#D97706"]].map(([l, v, c]) => (
            <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>{l}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: c }}>{v}</div>
            </div>
          ))}
        </div>

        {msg && <div style={{ background: msg.startsWith("✅") ? "rgba(0,200,150,0.1)" : "rgba(224,90,90,0.1)", border: `1px solid ${msg.startsWith("✅") ? "rgba(0,200,150,0.3)" : "rgba(224,90,90,0.3)"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, fontWeight: 600, color: msg.startsWith("✅") ? "#00C896" : "#E05A5A" }}>{msg}</div>}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["brokers", "Brokeri"], ["leads", "Leaduri"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{ background: activeTab === key ? "rgba(0,102,255,0.2)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${activeTab === key ? "#4A9EFF" : "rgba(255,255,255,0.1)"}`, color: activeTab === key ? "#4A9EFF" : "#5B7FA6", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
          ))}
          <button onClick={loadData} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#5B7FA6", borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>↺ Refresh</button>
        </div>

        {activeTab === "brokers" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#E8F0FF" }}>Brokeri ({brokers.length})</div>
              <button onClick={() => setShowAdd(!showAdd)} style={{ background: showAdd ? "rgba(0,102,255,0.2)" : "linear-gradient(135deg,#0066FF,#0044CC)", border: showAdd ? "1px solid rgba(0,102,255,0.4)" : "none", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                {showAdd ? "✕ Anuleaza" : "+ Broker Nou"}
              </button>
            </div>

            {showAdd && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid rgba(0,102,255,0.2)" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#4A9EFF", marginBottom: 18 }}>Broker Nou + Configurare Chatbot</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[["Companie *", "companyName", "ex: TradeMax SRL"], ["Nume Admin *", "adminName", "ex: Ion Popescu"], ["Username *", "username", "ex: ion.popescu"], ["Parola *", "password", "min 8 caractere"], ["Capital Minim Acceptat", "capitalMin", "ex: 1.000 EUR"]].map(([label, field, ph]) => (
                    <div key={field}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>{label}</label>
                      <input value={newBroker[field]} onChange={e => setNewBroker(n => ({ ...n, [field]: e.target.value }))} placeholder={ph}
                        type={field === "password" ? "password" : "text"}
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 14px", color: "#E8F0FF", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Praguri HOT / WARM</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={newBroker.pragHot} onChange={e => setNewBroker(n => ({ ...n, pragHot: e.target.value }))} placeholder="HOT (ex: 70)"
                        style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 14px", color: "#E8F0FF", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
                      <input value={newBroker.pragWarm} onChange={e => setNewBroker(n => ({ ...n, pragWarm: e.target.value }))} placeholder="WARM (ex: 40)"
                        style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "10px 14px", color: "#E8F0FF", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#3D5A7A", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>Produse Oferite</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PRODUSE_OPTIONS.map(p => (
                      <button key={p} onClick={() => setNewBroker(n => ({ ...n, produse: n.produse.includes(p) ? n.produse.filter(x => x !== p) : [...n.produse, p] }))}
                        style={{ background: newBroker.produse.includes(p) ? "rgba(0,200,150,0.15)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${newBroker.produse.includes(p) ? "#00C896" : "rgba(255,255,255,0.1)"}`, color: newBroker.produse.includes(p) ? "#00C896" : "#5B7FA6", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{p}</button>
                    ))}
                  </div>
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

            {loading ? <div style={{ textAlign: "center", padding: 40, color: "#3D5A7A" }}>Se incarca...</div>
              : brokers.length === 0 ? (
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 48, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🏢</div>
                  <div style={{ fontWeight: 700, color: "#E8F0FF", marginBottom: 6 }}>Niciun broker adaugat inca</div>
                </div>
              ) : brokers.map(broker => {
                const act = broker.active && new Date(broker.expiry) > new Date();
                const days = Math.ceil((new Date(broker.expiry) - new Date()) / 86400000);
                const urgent = act && days <= 5;
                const avatar = broker.admin_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
                return (
                  <div key={broker.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", border: `1.5px solid ${!act ? "rgba(224,90,90,0.2)" : urgent ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.07)"}`, marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar initials={avatar} size={42} color={act ? "#0055D4" : "#64748B"} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 15, color: act ? "#E8F0FF" : "#5B7FA6" }}>{broker.company_name}</div>
                          <div style={{ fontSize: 12, color: "#3D5A7A" }}>@{broker.username} • {broker.admin_name}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ background: act ? "rgba(0,200,150,0.12)" : "rgba(224,90,90,0.12)", border: `1px solid ${act ? "rgba(0,200,150,0.3)" : "rgba(224,90,90,0.3)"}`, color: act ? "#00C896" : "#E05A5A", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>{act ? "ACTIV" : "EXPIRAT"}</span>
                        <span style={{ background: urgent ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${urgent ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.08)"}`, color: urgent ? "#F5A623" : "#5B7FA6", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                          {act ? `${days} zile` : `Expirat ${fmtDate(broker.expiry)}`}
                        </span>
                        <button onClick={() => toggleBroker(broker)} style={{ background: act ? "rgba(224,90,90,0.1)" : "rgba(0,200,150,0.1)", border: `1px solid ${act ? "rgba(224,90,90,0.25)" : "rgba(0,200,150,0.25)"}`, color: act ? "#E05A5A" : "#00C896", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{act ? "Blocheaza" : "Activeaza"}</button>
                        <button onClick={() => deleteBroker(broker)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#3D5A7A", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>🗑</button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {activeTab === "leads" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#E8F0FF", marginBottom: 16 }}>Leaduri ({leads.length})</div>
            {loading ? <div style={{ textAlign: "center", padding: 40, color: "#3D5A7A" }}>Se incarca...</div>
              : leads.length === 0 ? (
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 48, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                  <div style={{ fontWeight: 700, color: "#E8F0FF", marginBottom: 6 }}>Niciun lead inca</div>
                  <div style={{ fontSize: 13, color: "#3D5A7A" }}>Leadurile apar dupa ce clientii completeaza chatbot-ul.</div>
                </div>
              ) : leads.map(lead => {
                const s = sc(lead.score);
                return (
                  <div key={lead.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px 18px", border: `1.5px solid rgba(255,255,255,0.07)`, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: s.color }}>{lead.score}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F0FF" }}>Lead #{lead.id?.slice(-6)}</div>
                          <div style={{ fontSize: 11, color: "#3D5A7A" }}>{fmt(lead.created_at)}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                        {lead.profil && <ProfileBadge profil={lead.profil} />}
                        <span style={{ fontSize: 12, color: "#5B7FA6" }}>{lead.capital}</span>
                        <Badge status={lead.status} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                      {[["Experienta", lead.experienta], ["Risc", lead.risc], ["Orizont", lead.orizont], ["Obiectiv", lead.obiectiv]].map(([k, v]) => v && v !== "—" && v !== "N/A" ? (
                        <span key={k} style={{ fontSize: 11, color: "#5B7FA6", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: 6 }}>{k}: {v}</span>
                      ) : null)}
                    </div>
                  </div>
                );
              })}
          </>
        )}
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
    if (username === OWNER_CREDENTIALS.username && password === OWNER_CREDENTIALS.password) {
      onOwnerLogin(); setLoading(false); return;
    }
    try {
      const { data } = await supabase.from('salesflow_brokers').select('*').eq('username', username).eq('password', password).single();
      if (data) { onBrokerLogin(data); setLoading(false); return; }
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
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#0066FF,#00C896)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 22, margin: "0 auto 14px" }}>S</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0F172A" }}>SalesFlow AI</div>
          <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>Portal Acces</div>
        </div>
        {[["Username", username, setUsername, "text", "ex: mihai.ionescu"], ["Parola", password, setPassword, "password", "••••••••"]].map(([label, val, setter, type, ph]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>{label}</label>
            <input value={val} onChange={e => setter(e.target.value)} onKeyDown={e => e.key === "Enter" && tryLogin()} type={type} placeholder={ph}
              style={{ width: "100%", background: "#F8FAFC", border: `1.5px solid ${error ? "#FCA5A5" : "#E2E8F0"}`, borderRadius: 10, padding: "12px 15px", fontSize: 14, color: "#0F172A", outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "#0066FF"} onBlur={e => e.target.style.borderColor = error ? "#FCA5A5" : "#E2E8F0"} />
          </div>
        ))}
        {error && <div style={{ fontSize: 12, color: "#DC2626", marginBottom: 12, fontWeight: 600 }}>{error}</div>}
        <button onClick={tryLogin} disabled={loading} style={{ width: "100%", background: loading ? "#EEF2FF" : "linear-gradient(135deg,#0066FF,#0044CC)", border: "none", color: loading ? "#94A3B8" : "#fff", borderRadius: 11, padding: "13px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif" }}>
          {loading ? "Se verifica..." : "Intra in cont →"}
        </button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "#CBD5E1" }}>markets4all.ro</div>
      </div>
    </div>
  );
}

// ==================== CLIENT CHATBOT (ADAPTIV) ====================
function ClientChatbot({ onGoToLogin, brokerConfig = {} }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const saveLead = async (data, conversation) => {
    try {
      await callEdgeFunction({
        saveLead: {
          ...data,
          conversation: conversation.map(m => ({ role: m.role, content: m.content })),
        },
      });
      setLeadSaved(true);
    } catch (e) { console.error('Error saving lead:', e); }
  };

  const systemPrompt = buildSystemPrompt(brokerConfig);

  const startChat = async () => {
    setStarted(true); setLoading(true);
    try {
      const result = await callEdgeFunction({
        systemPrompt,
        messages: [{ role: "user", content: "Buna ziua, sunt interesat sa investesc." }],
      });
      const text = result.text || "";
      setMessages([{ role: "user", content: "Buna ziua, sunt interesat sa investesc.", hidden: true }, { role: "assistant", content: cleanText(text) }]);
    } catch {
      setMessages([{ role: "assistant", content: `Buna ziua! Bine ati venit la ${brokerConfig.companyName || "InvestPro Capital"}. Cum va pot ajuta?` }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages.filter(m => !m.hidden), userMsg];
    setMessages(newMessages); setInput(""); setLoading(true);
    try {
      const result = await callEdgeFunction({
        systemPrompt,
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      });
      const text = result.text || "";
      const parsed = parseLeadData(text);
      const updatedMessages = [...newMessages, { role: "assistant", content: cleanText(text) }];
      setMessages(updatedMessages);
      if (parsed.profil) setCurrentProfile(parsed.profil);
      if (parsed.status && !leadSaved) await saveLead(parsed, updatedMessages);
    } catch { setMessages(m => [...m, { role: "assistant", content: "Va rog sa repetati, a aparut o problema tehnica." }]); }
    setLoading(false);
  };

  const visible = messages.filter(m => !m.hidden);
  const companyName = brokerConfig.companyName || "InvestPro Capital";
  const initials = companyName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const profileHint = currentProfile ? {
    INCEPATOR: { text: "Ghid pentru incepatori", color: "#6D28D9", bg: "#F5F3FF" },
    INTERMEDIAR: { text: "Profil intermediar detectat", color: "#1D4ED8", bg: "#EFF6FF" },
    AVANSAT: { text: "Investitor experimentat", color: "#D97706", bg: "#FFFBEB" },
  }[currentProfile] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "'DM Sans',sans-serif", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "13px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16 }}>{initials}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0D1B3E" }}>{companyName}</div>
            <div style={{ fontSize: 11, color: "#8A9BB8" }}>Consultant Virtual</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {profileHint && (
            <span style={{ background: profileHint.bg, color: profileHint.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: `1px solid ${profileHint.color}33` }}>
              {profileHint.text}
            </span>
          )}
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C896" }} />
          <span style={{ fontSize: 12, color: "#00A86B", fontWeight: 600 }}>Online</span>
          <button onClick={onGoToLogin} style={{ background: "none", border: "none", color: "#E2E8F0", fontSize: 10, cursor: "pointer" }}>●</button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 660, width: "100%", margin: "0 auto", padding: "0 16px" }}>
        {!started ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 50, marginBottom: 18 }}>💼</div>
            <h2 style={{ fontSize: 23, fontWeight: 800, color: "#0D1B3E", margin: "0 0 10px" }}>Bun venit la {companyName}</h2>
            <p style={{ color: "#8A9BB8", fontSize: 14, lineHeight: 1.8, maxWidth: 380, margin: "0 0 10px" }}>Consultantul nostru virtual se adapteaza profilului tau si te ghideaza spre cea mai potrivita solutie de investitii.</p>
            <p style={{ color: "#CBD5E1", fontSize: 12, margin: "0 0 26px" }}>Conversatie personalizata • Fara jargon • 5 minute</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: 26 }}>
              {(brokerConfig.produse?.length > 0 ? brokerConfig.produse : ["Forex & CFD", "Actiuni & ETF", "Materii Prime"]).map(t => (
                <span key={t} style={{ background: "#EEF2FF", color: "#0055D4", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <button onClick={startChat} style={{ background: "linear-gradient(135deg,#003087,#0055D4)", border: "none", color: "#fff", padding: "14px 34px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(0,48,135,0.28)", fontFamily: "'DM Sans',sans-serif" }}>
              Incepe Consultanta Personalizata →
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 0", display: "flex", flexDirection: "column", gap: 11 }}>
              {visible.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
                  {msg.role === "assistant" && <div style={{ width: 32, height: 32, minWidth: 32, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 12 }}>{initials}</div>}
                  <div style={{ maxWidth: "74%", padding: "11px 15px", fontSize: 14, lineHeight: 1.7, background: msg.role === "user" ? "linear-gradient(135deg,#003087,#0055D4)" : "#fff", color: msg.role === "user" ? "#fff" : "#1E293B", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", border: msg.role === "user" ? "none" : "1px solid #E2E8F0", boxShadow: msg.role === "user" ? "0 3px 10px rgba(0,48,135,0.18)" : "0 1px 5px rgba(0,0,0,0.05)" }}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 32, height: 32, minWidth: 32, background: "linear-gradient(135deg,#003087,#0055D4)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 12 }}>{initials}</div>
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
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? "#EEF2FF" : "linear-gradient(135deg,#003087,#0055D4)", border: "none", borderRadius: 11, width: 46, height: 46, cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontSize: 17, color: loading || !input.trim() ? "#94A3B8" : "#fff", transition: "all 0.2s" }}>→</button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:4px}`}</style>
    </div>
  );
}

// ==================== MAIN ====================
export default function SalesFlowApp() {
  const [view, setView] = useState("client");
  const [currentBroker, setCurrentBroker] = useState(null);

  const handleBrokerLogin = (broker) => {
    setCurrentBroker(broker);
    const act = broker.active && new Date(broker.expiry) > new Date();
    setView(act ? "broker" : "expired");
  };

  if (view === "client") return <ClientChatbot onGoToLogin={() => setView("login")} brokerConfig={{ companyName: "InvestPro Capital", produse: ["Forex/CFD", "Actiuni & ETF-uri", "Materii prime"], capitalMin: "1.000 EUR", pragHot: 70, pragWarm: 40 }} />;
  if (view === "login") return <Login onOwnerLogin={() => setView("owner")} onBrokerLogin={handleBrokerLogin} />;
  if (view === "owner") return <OwnerPanel onLogout={() => setView("client")} />;
  if (view === "expired" && currentBroker) return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, maxWidth: 440, textAlign: "center", border: "1px solid #E2E8F0" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>⏰</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: "#0F172A", marginBottom: 10 }}>Abonament Expirat</div>
        <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 28 }}>Abonamentul <strong>{currentBroker.company_name}</strong> a expirat.</div>
        <button onClick={() => { setCurrentBroker(null); setView("client"); }} style={{ background: "none", border: "1px solid #E2E8F0", color: "#94A3B8", borderRadius: 10, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Inapoi</button>
      </div>
    </div>
  );
  return null;
}
