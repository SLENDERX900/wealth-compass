import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import PhoneNavBar from "@/components/aurora/PhoneNavBar";

const complianceItems = [
  { id: "kyc", label: "KYC/AML Verification", met: true },
  { id: "suitability", label: "Suitability Assessment", met: true },
  { id: "risk", label: "Risk Profiling", met: true },
  { id: "disclosure", label: "Product Disclosure", met: true },
  { id: "reporting", label: "Sustainability Reporting", met: false },
  { id: "taxonomy", label: "MAS Taxonomy Alignment", met: true },
];

const auditEvents = [
  { date: "2026-02-15", event: "Annual ESG audit completed", type: "Audit" },
  { date: "2026-01-20", event: "Suitability reassessment", type: "Review" },
  { date: "2025-12-01", event: "MAS certification renewed", type: "Certification" },
  { date: "2025-10-15", event: "Privacy assessment passed", type: "Privacy" },
];

const ComplianceSection = () => {
  const [viewMode, setViewMode] = useState("Simple");
  const [shareAdvisor, setShareAdvisor] = useState(true);
  const [anonAnalytics, setAnonAnalytics] = useState(true);
  const [thirdParty, setThirdParty] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showDisclosures, setShowDisclosures] = useState(false);
  const [activeNav, setActiveNav] = useState("portfolio");

  const IOSToggle = ({ label, sublabel, checked, onChange }: { label: string; sublabel: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-1.5" onClick={(e) => e.stopPropagation()}>
      <div>
        <p className="text-[10px]">{label}</p>
        <p className="text-[8px] text-gray-400">{sublabel}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
        className={`rounded-full relative transition-colors ${checked ? "bg-emerald-400" : "bg-gray-300"}`}
        style={{ width: 32, height: 18 }}>
        <motion.div className="absolute top-0.5 rounded-full bg-white shadow"
          animate={{ left: checked ? 14 : 2 }} transition={{ duration: 0.15 }} style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );

  return (
    <SectionLayout id="trust">
      <ScrollReveal><SectionLabel label="TRUST" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline className="mb-4">Built for Trust</GradientHeadline>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground mb-6 max-w-lg">Aurora meets MAS regulatory standards with bank-grade security, transparent disclosures, and user-controlled privacy settings.</p>
      </ScrollReveal>

      {/* Trust indicators */}
      <ScrollReveal delay={0.2}>
        <div className="flex gap-6 mb-12 text-sm text-muted-foreground">
          <span>✅ <strong className="text-foreground">5/6</strong> MAS requirements met</span>
          <span>🔒 <strong className="text-foreground">92%</strong> suitability score</span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="flex justify-center">
        <IPhoneMockup>
          <div className="h-full bg-white text-gray-900 flex flex-col overflow-y-auto">
            {activeNav === "portfolio" ? (
              <>
            <div className="pt-10 px-3 pb-1">
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-center mb-2">Compliance</p>

              {/* Suitability gauge */}
              <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100 mb-2">
                <p className="text-2xl font-light text-emerald-600">92%</p>
                <p className="text-[9px] text-gray-500">Suitability Score</p>
              </div>

              {/* View mode */}
              <FilterToggleGroup compact options={["Simple", "Full Legal"]} selected={viewMode} onChange={setViewMode} className="justify-center mb-2" />
            </div>

            <div className="px-3 flex-1 space-y-1">
              {/* MAS Checklist */}
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">MAS Checklist</p>
              {complianceItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 py-1">
                  <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center ${item.met ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-300"}`}>
                    {item.met ? "✓" : "○"}
                  </span>
                  <div>
                    <span className="text-[10px]">{item.label}</span>
                    {viewMode === "Full Legal" && <p className="text-[7px] text-gray-400">Section 27A(1) FAA</p>}
                  </div>
                </div>
              ))}

              <div className="h-px bg-gray-100 my-1" />
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Privacy</p>
              <IOSToggle label="Share with Advisor" sublabel={viewMode === "Full Legal" ? "PDPA Section 13" : "Advisor sees portfolio"} checked={shareAdvisor} onChange={setShareAdvisor} />
              <IOSToggle label="Anonymous Analytics" sublabel={viewMode === "Full Legal" ? "PDPA Section 2" : "Improve Aurora"} checked={anonAnalytics} onChange={setAnonAnalytics} />
              <IOSToggle label="Third-Party Data" sublabel={viewMode === "Full Legal" ? "Third Schedule" : "Partner access"} checked={thirdParty} onChange={setThirdParty} />

              <div className="h-px bg-gray-100 my-1" />
              {/* Audit + Disclosures */}
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); setShowAudit(!showAudit); }}
                  className={`text-[8px] px-2 py-1 rounded-lg border ${showAudit ? "bg-cyan-50 border-cyan-200" : "border-gray-200"}`}>📋 Audit Trail</button>
                <button onClick={(e) => { e.stopPropagation(); setShowDisclosures(!showDisclosures); }}
                  className={`text-[8px] px-2 py-1 rounded-lg border ${showDisclosures ? "bg-amber-50 border-amber-200" : "border-gray-200"}`}>⚖️ Disclosures</button>
              </div>

              <AnimatePresence>
                {showAudit && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    {auditEvents.map((e, i) => (
                      <motion.div key={e.date} className="flex gap-2 items-start py-0.5" initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                        <div><p className="text-[9px]">{e.event}</p><p className="text-[7px] text-gray-400">{e.date}</p></div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showDisclosures && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="text-[8px] text-gray-400 py-1">Aurora receives no commission from providers. All ESG scores are from independent verifiers. Advisor compensation is fee-based only.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </IPhoneMockup>
      </ScrollReveal>
    </SectionLayout>
  );
};

export default ComplianceSection;
