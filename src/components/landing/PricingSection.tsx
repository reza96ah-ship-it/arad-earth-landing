import { BadgeCheck, CreditCard, ShoppingCart } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";

type PricingSectionProps = {
  onAddToCart: () => void;
};

export function PricingSection({ onAddToCart }: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-slate-950 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          centered
          eyebrow="License"
          title="Start with a professional license."
          description="Use the website for business introduction first. Real checkout and PayPal integration will be connected after the product page is stable."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#020617] p-8">
            <h3 className="text-2xl font-semibold">Enterprise Deployment</h3>
            <p className="mt-4 leading-7 text-slate-400">
              For organizations that need training, private deployment, offline/local network options, and custom geospatial workflows.
            </p>

            <div className="mt-8 grid gap-3">
              {["Private deployment", "Training package", "Custom modules", "Server setup support"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <BadgeCheck className="h-5 w-5 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>

            <Button href="#contact" variant="secondary" className="mt-8">
              Request Enterprise Demo
            </Button>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/30 bg-cyan-300/10 p-8 shadow-2xl shadow-cyan-950/20">
            <div className="mb-4 inline-flex rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-slate-950">
              Recommended
            </div>

            <h3 className="text-3xl font-semibold">Professional License</h3>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-5xl font-bold">$1,490</span>
              <span className="mb-2 text-slate-400">one-time</span>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                "Full ARAD Earth Studio access",
                "3D Earth visualization workflow",
                "Drawing and analysis modules",
                "Timeline and presentation tools",
                "Priority email support",
                "License activation support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <BadgeCheck className="h-5 w-5 text-cyan-200" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button onClick={onAddToCart}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>

              <Button variant="paypal">
                <CreditCard className="h-4 w-4" />
                Pay with PayPal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
