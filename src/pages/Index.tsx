import ScrollProgress from "@/components/aurora/ScrollProgress";
import HeroSection from "@/sections/HeroSection";
import ImpactSection from "@/sections/ImpactSection";
import SocietySection from "@/sections/SocietySection";
import CarbonTaxSection from "@/sections/CarbonTaxSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ESGSection from "@/sections/ESGSection";
import PersonasSection from "@/sections/PersonasSection";
import PreferencesSection from "@/sections/PreferencesSection";
import ScenariosSection from "@/sections/ScenariosSection";
import NudgesSection from "@/sections/NudgesSection";
import AdvisorSection from "@/sections/AdvisorSection";
import RewardsSection from "@/sections/RewardsSection";
import ComplianceSection from "@/sections/ComplianceSection";
import ClosingSection from "@/sections/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <ImpactSection />
      <SocietySection />
      <CarbonTaxSection />
      <PortfolioSection />
      <ESGSection />
      <PersonasSection />
      <PreferencesSection />
      <ScenariosSection />
      <NudgesSection />
      <AdvisorSection />
      <RewardsSection />
      <ComplianceSection />
      <ClosingSection />
    </div>
  );
};

export default Index;
