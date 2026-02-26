import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/aurora/ScrollReveal";
import SectionLabel from "@/components/aurora/SectionLabel";
import GradientHeadline from "@/components/aurora/GradientHeadline";
import SectionLayout from "@/components/aurora/SectionLayout";
import IPhoneMockup from "@/components/aurora/IPhoneMockup";
import FilterToggleGroup from "@/components/aurora/FilterToggleGroup";
import { Switch } from "@/components/ui/switch";

const complianceItems = [
  { id: "kyc", label: "KYC/AML Verification", met: true },
  { id: "suitability", label: "Suitability Assessment", met: true },
  { id: "risk", label: "Risk Profiling", met: true },
  { id: "disclosure", label: "Product Disclosure Statements", met: true },
  { id: "reporting", label: "Annual Sustainability Reporting", met: false },
  { id: "taxonomy", label: "MAS Taxonomy Alignment", met: true },
];

const auditEvents = [
  { date: "2026-02-15", event: "Annual ESG audit completed", type: "Audit" },
  { date: "2026-01-20", event: "Portfolio suitability reassessment", type: "Review" },
  { date: "2025-12-01", event: "MAS compliance certification renewed", type: "Certification" },
  { date: "2025-10-15", event: "Data privacy assessment passed", type: "Privacy" },
  { date: "2025-08-30", event: "Conflict of interest review completed", type: "Review" },
];

const ComplianceSection = () => {
  const [viewMode, setViewMode] = useState("Simplified");
  const [shareAdvisor, setShareAdvisor] = useState(true);
  const [anonAnalytics, setAnonAnalytics] = useState(true);
  const [thirdParty, setThirdParty] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showDisclosures, setShowDisclosures] = useState(false);

  return (
    <SectionLayout id="trust">
      <ScrollReveal><SectionLabel label="TRUST" /></ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GradientHeadline className="mb-4">Built for Trust</GradientHeadline>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterToggleGroup options={["Simplified", "Full Legal"]} selected={viewMode} onChange={setViewMode} />
          <button onClick={() => setShowAudit(!showAudit)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showAudit ? "bg-aurora-cyan/15 text-foreground" : "text-muted-foreground"}`}
          >Audit Trail</button>
          <button onClick={() => setShowDisclosures(!showDisclosures)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${showDisclosures ? "bg-aurora-gold/15 text-foreground" : "text-muted-foreground"}`}
          >Conflict Disclosures</button>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* MAS Checklist */}
          <ScrollReveal delay={0.25}>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-sm font-medium mb-4">MAS Compliance Checklist</h3>
              <div className="space-y-2">
                {complianceItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-1">
                    <motion.div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.met ? "border-emerald-500 bg-emerald-500/10" : "border-border"}`}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                      {item.met && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 text-xs">✓</motion.span>}
                    </motion.div>
                    <span className="text-sm">{item.label}</span>
                    {viewMode === "Full Legal" && (
                      <span className="text-[10px] text-muted-foreground ml-auto">Section 27A(1) FAA</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Privacy Controls */}
          <ScrollReveal delay={0.3}>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-sm font-medium mb-4">Privacy Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm">Share with Advisor</p><p className="text-xs text-muted-foreground">{viewMode === "Full Legal" ? "Under PDPA Section 13 consent framework" : "Your advisor can see your portfolio data"}</p></div>
                  <Switch checked={shareAdvisor} onCheckedChange={setShareAdvisor} />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm">Anonymous Analytics</p><p className="text-xs text-muted-foreground">{viewMode === "Full Legal" ? "Aggregated, de-identified data per PDPA Section 2" : "Help improve Aurora with anonymous usage data"}</p></div>
                  <Switch checked={anonAnalytics} onCheckedChange={setAnonAnalytics} />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm">Third-Party Data</p><p className="text-xs text-muted-foreground">{viewMode === "Full Legal" ? "Data sharing per PDPA Third Schedule obligations" : "Allow partner services to access your data"}</p></div>
                  <Switch checked={thirdParty} onCheckedChange={setThirdParty} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Audit Trail */}
          <AnimatePresence>
            {showAudit && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-medium mb-4">Audit Trail</h3>
                  <div className="space-y-3">
                    {auditEvents.map((e, i) => (
                      <motion.div key={e.date} className="flex gap-4 items-start" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                        <div className="w-2 h-2 rounded-full bg-aurora-cyan mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm">{e.event}</p>
                          <p className="text-xs text-muted-foreground">{e.date} · {e.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conflict Disclosures */}
          <AnimatePresence>
            {showDisclosures && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-medium mb-3">Conflict of Interest Disclosures</h3>
                  <p className="text-sm text-muted-foreground">Aurora receives no commission or referral fees from any portfolio provider. All ESG scores are sourced from independent third-party verifiers. Advisor compensation is fee-based only, with no product-linked incentives.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ScrollReveal delay={0.35} className="flex justify-center">
          <IPhoneMockup>
            <div className="h-full p-4 bg-white text-gray-900 flex flex-col gap-2">
              <p className="pt-8 text-[10px] uppercase tracking-widest opacity-50 text-center">Compliance</p>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-light">92%</p>
                <p className="text-[10px] text-gray-500">Suitability Score</p>
              </div>
              <div className="flex-1 space-y-1 mt-2">
                {complianceItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                    <span className={`text-[10px] ${item.met ? "text-emerald-500" : "text-gray-300"}`}>✓</span>
                    <span className="text-[10px]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </IPhoneMockup>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
};

export default ComplianceSection;
