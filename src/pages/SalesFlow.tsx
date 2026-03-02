import { useState } from "react";
import { MessageSquare, HelpCircle, BarChart3, Bell, Bot, LayoutDashboard, Users, Calendar, Download, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SalesFlow = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    platform: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast({ title: "Completează câmpurile obligatorii", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    toast({ title: "Mulțumim!", description: "Te vom contacta în maxim 4 ore." });
    setFormData({ name: "", company: "", email: "", phone: "", platform: "", message: "" });
    setSubmitting(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white font-sans">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,102,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-transparent to-[#0A0F1E]" />
        </div>
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0066FF] rounded-full blur-[200px] opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00C896] rounded-full blur-[200px] opacity-10 animate-pulse" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-sm text-[#0066FF]">
            <Bot className="w-4 h-4" />
            Calificare automată a leadurilor cu AI
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Transformă Vizitatorii în{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C896]">
              Leaduri Calificate.
            </span>{" "}
            Automat.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            SalesFlow AI califică potențialii investitori prin conversație inteligentă înainte ca agenții tăi să
            aloce o singură secundă. Tu primești doar leaduri HOT, gata de conversie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-[#0066FF] hover:bg-[#0055DD] text-white px-8 py-6 text-lg rounded-xl"
            >
              Cere Demo Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollTo("steps")}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-white/5 px-8 py-6 text-lg rounded-xl"
            >
              Vezi cum funcționează
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            70% din leadurile tale sunt necalificate.{" "}
            <span className="text-[#0066FF]">Știai?</span>
          </h2>
          <div className="h-1 w-20 bg-[#0066FF] mx-auto mb-16 rounded-full" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 space-y-5">
              <h3 className="text-xl font-semibold text-red-400 mb-6">❌ Fără SalesFlow AI</h3>
              {[
                "Agenții pierd 4-6 ore pe zi pe leaduri slabe",
                "Costuri mari per client convertit",
                "Frustrare în echipa de vânzări",
                "Rată de conversie sub 10%",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            {/* With */}
            <div className="rounded-2xl border border-[#00C896]/20 bg-[#00C896]/5 p-8 space-y-5">
              <h3 className="text-xl font-semibold text-[#00C896] mb-6">✅ Cu SalesFlow AI</h3>
              {[
                "Agenții vorbesc doar cu investitori serioși",
                "Cost per conversie redus cu 60%",
                "Echipă motivată și focusată",
                "Rată de conversie peste 35%",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#00C896] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="py-24 px-6 bg-[#080C1A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Simplu. Automat. <span className="text-[#00C896]">Eficient.</span>
          </h2>
          <div className="h-1 w-20 bg-[#00C896] mx-auto mb-16 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageSquare,
                num: "01",
                title: "Vizitatorul pornește conversația",
                desc: "Un potențial investitor ajunge pe site-ul tău și inițiază dialogul cu asistentul virtual SalesFlow AI.",
              },
              {
                icon: HelpCircle,
                num: "02",
                title: "8 întrebări inteligente",
                desc: "Chatbot-ul califică prospectul: capital disponibil, experiență, toleranță la risc, orizont de investiție.",
              },
              {
                icon: BarChart3,
                num: "03",
                title: "Scor automat HOT / WARM / COLD",
                desc: "Fiecare lead primește un scor de la 0 la 100 calculat pe criteriile tale specifice.",
              },
              {
                icon: Bell,
                num: "04",
                title: "Tu primești leadul calificat",
                desc: "Agentul tău primește notificare imediată cu toate datele completate, gata pentru apel.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#0066FF]/40 transition-colors group"
              >
                <span className="text-5xl font-black text-[#0066FF]/20 group-hover:text-[#0066FF]/40 transition-colors absolute top-4 right-6">
                  {step.num}
                </span>
                <step.icon className="w-10 h-10 text-[#0066FF] mb-5" />
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Tot ce ai nevoie. <span className="text-[#0066FF]">Nimic în plus.</span>
          </h2>
          <div className="h-1 w-20 bg-[#0066FF] mx-auto mb-16 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Bot, title: "Chatbot AI Personalizat", desc: "Configurat specific pentru produsele și criteriile tale. Nu un bot generic." },
              { icon: LayoutDashboard, title: "Dashboard în Timp Real", desc: "Vezi toate leadurile, scorurile și detaliile într-un singur loc accesibil oricând." },
              { icon: Users, title: "Multi-utilizator", desc: "Adminul atribuie leaduri agenților. Fiecare agent vede doar ce îi aparține." },
              { icon: Calendar, title: "Licență Flexibilă", desc: "Abonament lunar fără angajamente pe termen lung. Activare și dezactivare instant." },
              { icon: Download, title: "Instalare în 10 Minute", desc: "Funcționează pe orice platformă: WordPress, Wix, Webflow, Squarespace, site custom." },
              { icon: Shield, title: "Date 100% Ale Tale", desc: "Datele leadurilor tale sunt exclusive. Nu le accesăm, nu le vindem, nu le folosim." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#0066FF]/30 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="py-24 px-6 bg-[#080C1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Testează Acum. <span className="text-[#00C896]">Gratuit.</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Exact așa arată chatbot-ul pe site-ul unui broker partener. Încearcă o conversație reală.
          </p>
          <iframe
            src="/chatbot"
            width="100%"
            height="700px"
            frameBorder="0"
            className="rounded-2xl"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
          />
          <p className="text-gray-500 text-sm mt-6">
            Acesta este un demo live. Datele introduse nu sunt salvate.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Transparent. <span className="text-[#0066FF]">Fără surprize.</span>
          </h2>
          <div className="h-1 w-20 bg-[#0066FF] mx-auto mb-16 rounded-full" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">99€</span>
                <span className="text-gray-400">/lună</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Până la 500 leaduri/lună", "1 chatbot configurat", "Dashboard complet", "Suport email", "Instalare inclusă"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-[#00C896] shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button
                onClick={() => scrollTo("contact")}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-white/5 py-6 rounded-xl text-base"
              >
                Începe Acum
              </Button>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-[#0066FF] bg-[#0066FF]/5 p-8 flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#0066FF] text-white px-4 py-1 text-sm hover:bg-[#0066FF]">
                  Cel mai popular
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">199€</span>
                <span className="text-gray-400">/lună</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Leaduri nelimitate",
                  "3 chatboți configurabili",
                  "Multi-utilizator cu roluri",
                  "Integrare CRM",
                  "Suport WhatsApp prioritar",
                  "Personalizări lunare incluse",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-[#00C896] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => scrollTo("contact")}
                className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white py-6 rounded-xl text-base"
              >
                Cere Demo
              </Button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            Primii 3 brokeri parteneri beneficiază de 30 de zile gratuit. Fără card de credit.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 px-6 bg-[#080C1A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Cere <span className="text-[#0066FF]">Demo-ul Gratuit</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Îți configurăm chatbot-ul în 48 de ore. Fără niciun angajament.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                placeholder="Nume complet *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 py-6 rounded-xl"
              />
              <Input
                placeholder="Numele companiei *"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 py-6 rounded-xl"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 py-6 rounded-xl"
              />
              <Input
                placeholder="Telefon / WhatsApp"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 py-6 rounded-xl"
              />
            </div>
            <Select value={formData.platform} onValueChange={(v) => setFormData({ ...formData, platform: v })}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white py-6 rounded-xl [&>span]:text-gray-500 data-[state=open]:text-white">
                <SelectValue placeholder="Platforma site-ului" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0F1E] border-white/10 text-white">
                {["WordPress", "Wix", "Webflow", "Squarespace", "Site Custom", "Alta"].map((p) => (
                  <SelectItem key={p} value={p.toLowerCase()} className="focus:bg-white/10 focus:text-white">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Mesaj opțional"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl min-h-[100px]"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white py-6 rounded-xl text-lg"
            >
              {submitting ? "Se trimite..." : "Vreau Demo-ul Gratuit →"}
            </Button>
            <p className="text-center text-gray-500 text-sm">
              Răspundem în maxim 4 ore în zilele lucrătoare.{" "}
              <a href="https://markets4all.ro" target="_blank" rel="noopener noreferrer" className="text-[#0066FF] hover:underline">
                markets4all.ro
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5">
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto">
          SalesFlow AI este un produs{" "}
          <a href="https://markets4all.ro" target="_blank" rel="noopener noreferrer" className="text-[#0066FF] hover:underline">
            markets4all.ro
          </a>{" "}
          — Platforma de calificare a leadurilor pentru brokeri financiari din România.
        </p>
      </footer>
    </div>
  );
};

export default SalesFlow;
