import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartModal } from "./components/ecommerce/CartModal";
import { HeroSection } from "./components/landing/HeroSection";
import { PositioningStrip } from "./components/landing/PositioningStrip";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { DemoSection } from "./components/landing/DemoSection";
import { WorkflowSection } from "./components/landing/WorkflowSection";
import { ModulesSection } from "./components/landing/ModulesSection";
import { UseCasesSection } from "./components/landing/UseCasesSection";
import { PricingSection } from "./components/landing/PricingSection";
import { ContactSection } from "./components/landing/ContactSection";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount(1);
    setCartOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <HeroSection onAddToCart={addToCart} />
      <PositioningStrip />
      <FeaturesSection />
      <DemoSection />
      <WorkflowSection />
      <ModulesSection />
      <UseCasesSection />
      <PricingSection onAddToCart={addToCart} />
      <ContactSection />
      <Footer />

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={() => {
          setCartCount(0);
          setCartOpen(false);
        }}
      />
    </main>
  );
}
