import ScrollProgress from "@/components/aurora/ScrollProgress";
import SectionTransition from "@/components/aurora/SectionTransition";
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

const transitionVariants = ["gradient-wipe", "fade-blur", "parallax-reveal"] as const;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <SectionTransition variant={transitionVariants[0]} />
      <ImpactSection />
      <SectionTransition variant={transitionVariants[1]} />
      <SocietySection />
      <SectionTransition variant={transitionVariants[2]} />
      <CarbonTaxSection />
      <SectionTransition variant={transitionVariants[0]} />
      <PortfolioSection />
      <SectionTransition variant={transitionVariants[1]} />
      <ESGSection />
      <SectionTransition variant={transitionVariants[2]} />
      <PersonasSection />
      <SectionTransition variant={transitionVariants[0]} />
      <PreferencesSection />
      <SectionTransition variant={transitionVariants[1]} />
      <ScenariosSection />
      <SectionTransition variant={transitionVariants[2]} />
      <NudgesSection />
      <SectionTransition variant={transitionVariants[0]} />
      <AdvisorSection />
      <SectionTransition variant={transitionVariants[1]} />
      <RewardsSection />
      <SectionTransition variant={transitionVariants[2]} />
      <ComplianceSection />
      <SectionTransition variant={transitionVariants[0]} />
      <ClosingSection />
    </div>
  );
};

export default Index;
