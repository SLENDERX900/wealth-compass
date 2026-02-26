import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";

const advisors = [
  { id: 1, name: "Sarah Chen", specialty: "Sustainable Equities", credentials: ["CFA Charterholder", "GSIA Certified", "10+ years in ESG"], formal: ["I recommend reallocating 15% toward renewable energy funds.", "Your portfolio risk assessment indicates moderate exposure."], casual: ["I'd suggest moving about 15% into renewables — great upside right now.", "Your risk looks manageable, nothing to worry about!"] },
  { id: 2, name: "Marcus Tan", specialty: "Fixed Income & Green Bonds", credentials: ["FRM Certified", "Bloomberg ESG Analyst", "Ex-DBS Private Banking"], formal: ["The new Singapore green bond issuance offers an attractive risk-adjusted yield.", "I suggest a 5% allocation to investment-grade green bonds."], casual: ["Singapore's new green bonds look really solid — worth a look!", "Maybe put 5% into green bonds? The yield is pretty sweet."] },
  { id: 3, name: "Priya Sharma", specialty: "Impact & Thematic Investing", credentials: ["SASB FSA", "UN PRI Signatory Advisor", "Impact Measurement Specialist"], formal: ["Your impact metrics show strong alignment with UN SDG 7 and 13.", "I recommend the CleanTech thematic basket for enhanced impact exposure."], casual: ["Your portfolio is really making a difference on climate goals!", "The CleanTech basket could be a great fit for your values."] },
];

const AdvisorSection = () => {
  const [advisor, setAdvisor] = useState(advisors[0]);
  const [tab, setTab] = useState("Chat");
  const [showCredentials, setShowCredentials] = useState(false);
  const [tone, setTone] = useState<"Formal" | "Casual">("Formal");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const messages = tone === "Formal" ? advisor.formal : advisor.casual;

  const sendMessage = (msg: string) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  return (
    <SectionLayout wash="gold" id="advisory">
      <ScrollReveal><SectionLabel label="ADVISORY" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline highlight="Always Close." underline className="mb-4">Your Advisor. Always Close.</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterToggleGroup options={advisors.map((a) => a.name)} selected={advisor.name} onChange={(n) => { setAdvisor(advisors.find((a) => a.name === n)!); setChatMessages([]); }} />
          <FilterToggleGroup options={["Formal", "Casual"]} selected={tone} onChange={(v) => setTone(v as "Formal" | "Casual")} />
          <button onClick={() => setShowCredentials(!showCredentials)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showCredentials ? "bg-aurora-gold/15 text-foreground" : "text-muted-foreground"}`}
          >{showCredentials ? "Hide" : "Show"} Credentials</button>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0.25}>
          <div className="bg-card rounded-2xl border border-border p-6 gradient-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aurora-cyan/30 to-aurora-gold/30 flex items-center justify-center text-lg font-light">
                {advisor.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{advisor.name}</p>
                <p className="text-sm text-muted-foreground">{advisor.specialty}</p>
              </div>
            </div>

            <AnimatePresence>
              {showCredentials && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                  <div className="space-y-1 pt-3 border-t border-border">
                    {advisor.credentials.map((c) => (
                      <p key={c} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-aurora-gold" /> {c}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Demo chat */}
            <div className="space-y-2 mb-4">
              {messages.slice(0, 1).map((m, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg rounded-tl-sm p-3 text-sm max-w-[85%]">{m}</div>
              ))}
              {chatMessages.map((m, i) => (
                <motion.div key={i} className="bg-aurora-cyan/10 rounded-lg rounded-tr-sm p-3 text-sm max-w-[85%] ml-auto"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  {m}
                </motion.div>
              ))}
              {chatMessages.length > 0 && (
                <motion.div className="bg-secondary/50 rounded-lg rounded-tl-sm p-3 text-sm max-w-[85%]"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  {messages[1]}
                </motion.div>
              )}
            </div>
            <div className="flex gap-2">
              {["Tell me more", "What's my risk?", "Schedule a call"].map((opt) => (
                <button key={opt} onClick={() => sendMessage(opt)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-aurora-cyan/30 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Advisor</p>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-amber-200 flex items-center justify-center text-[10px]">
                  {advisor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[10px] font-medium">{advisor.name}</p>
                  <p className="text-[9px] text-gray-400">{advisor.specialty}</p>
                </div>
              </div>
              <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
                {["Chat", "Video", "Schedule"].map((t) => (
                  <button key={t} onClick={(e) => { e.stopPropagation(); setTab(t); }}
                    className={`flex-1 text-[9px] py-1.5 rounded-md transition-all ${tab === t ? "bg-white shadow-sm" : ""}`}>{t}</button>
                ))}
              </div>
              <div className="flex-1 space-y-1 mt-2">
                {tab === "Chat" && messages.map((m, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2 text-[10px]">{m}</div>
                ))}
                {tab === "Video" && <div className="flex-1 flex items-center justify-center text-[10px] text-gray-400">Video call ready</div>}
                {tab === "Schedule" && <div className="flex-1 flex items-center justify-center text-[10px] text-gray-400">Select a time slot</div>}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default AdvisorSection;
