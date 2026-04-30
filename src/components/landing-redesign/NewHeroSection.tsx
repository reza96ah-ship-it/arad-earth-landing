import { ArrowRight, Globe2 } from "lucide-react";
import { heroContent } from "../../content/landing";
import { Button } from "../ui/Button";

export function NewHeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
          <Globe2 className="h-4 w-4" />
          {heroContent.badge}
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          {heroContent.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
          {heroContent.subheadline}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#guided-demo">
            {heroContent.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#contact" variant="secondary">
            {heroContent.secondaryCta}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {heroContent.trustChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.24),rgba(15,23,42,0.95)_42%,rgba(2,6,23,1)_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20">
                <Globe2 className="h-28 w-28 text-cyan-100" />
              </div>
            </div>
            <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-left backdrop-blur">
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">Live scenario</div>
              <div className="mt-2 text-lg font-semibold text-white">Emergency Response</div>
              <div className="mt-1 text-sm text-slate-400">Chapter 01 · Context</div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/5 rounded-full bg-cyan-300" />
              </div>
              <div className="mt-3 text-sm text-slate-300">Minimal hero preview. Full inspector appears in guided demo.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
