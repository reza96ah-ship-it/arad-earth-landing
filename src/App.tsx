import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { NewHeroSection } from "./components/landing-redesign/NewHeroSection";
import { GuidedDemoSection } from "./components/landing-redesign/GuidedDemoSection";
import { WorkflowCardsSection } from "./components/landing-redesign/WorkflowCardsSection";
import { EngineCapabilitiesSection } from "./components/landing-redesign/EngineCapabilitiesSection";
import { DeploymentSection } from "./components/landing-redesign/DeploymentSection";
import { UseCasesSection } from "./components/landing-redesign/UseCasesSection";
import { FinalCTASection } from "./components/landing-redesign/FinalCTASection";

export default function App() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Header />

      <NewHeroSection />
      <GuidedDemoSection />
      <WorkflowCardsSection />
      <EngineCapabilitiesSection />
      <DeploymentSection />
      <UseCasesSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
