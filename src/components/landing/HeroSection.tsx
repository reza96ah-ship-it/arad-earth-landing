import { Mail, Play, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { HeroVisual } from "./HeroVisual";

type HeroSectionProps = {
  onAddToCart: () => void;
};

export function HeroSection({ onAddToCart }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#020617] pt-28">
      <div className="absolute inset-0 page-grid opacity-60" />
      <div className="hero-top-glow absolute left-1/2 top-0 h-[680px] w-[680px] -translate-x-1/2 rounded-full" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Badge>Professional 3D Geospatial Visualization Platform</Badge>

          <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Build, animate, analyze, and present Earth-based scenarios in 3D.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            ARAD Earth Studio is a professional geospatial studio for creating
            map-based scenarios, visualizing spatial data, drawing 2D/3D
            objects, managing layers, analyzing terrain, and producing
            cinematic Earth presentations.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#demo">
              <Button>
                <Play className="h-4 w-4" />
                Try Interactive Demo
              </Button>
            </a>

            <Button variant="secondary" onClick={onAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>

            <a href="#contact">
              <Button variant="dark">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-bold text-cyan-200">3D</div>
              <div className="mt-1 text-xs text-slate-400">
                Earth Workspace
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-bold text-cyan-200">12+</div>
              <div className="mt-1 text-xs text-slate-400">Studio Tools</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-2xl font-bold text-cyan-200">Pro</div>
              <div className="mt-1 text-xs text-slate-400">
                Scenario Workflow
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
