import {
  Activity,
  ArrowRight,
  Eye,
  Globe2,
  Layers3,
  RadioTower,
  Route,
  ShieldAlert,
} from "lucide-react";
import { heroContent } from "../../content/landing";
import { Button } from "../ui/Button";

const heroMetrics = [
  ["Scenario", "Emergency Response"],
  ["Phase", "Sensor Detection"],
  ["Confidence", "87%"],
  ["ETA", "12 min"],
];

const timelineSteps = [
  "Context",
  "Detection",
  "Analysis",
  "Action",
  "Report",
];

export function NewHeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_85%_25%,rgba(124,58,237,0.18),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,1)_88%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
      <div className="absolute left-1/2 top-24 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10">
          <Globe2 className="h-4 w-4" />
          {heroContent.badge}
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-bold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
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
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 backdrop-blur"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-6xl rounded-[2.2rem] border border-white/10 bg-slate-950/75 p-3 shadow-2xl shadow-cyan-950/40 backdrop-blur md:p-4">
          <div className="relative min-h-[560px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_48%_34%,rgba(34,211,238,0.26),rgba(15,23,42,0.94)_40%,rgba(2,6,23,1)_100%)] text-left">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_32%,rgba(34,211,238,0.08)_33%,transparent_34%,transparent_44%,rgba(34,211,238,0.06)_45%,transparent_46%)]" />

            <div className="absolute left-6 right-6 top-6 z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10">
                  <Activity className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">ARAD Earth Engine</div>
                  <div className="text-xs text-slate-500">Guided scenario preview · live story mode</div>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Operational picture online
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pt-10">
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20 md:h-80 md:w-80">
                <div className="absolute inset-6 rounded-full border border-cyan-200/20" />
                <div className="absolute inset-14 rounded-full border border-cyan-200/20" />
                <div className="absolute -left-20 top-1/2 h-px w-40 bg-gradient-to-r from-transparent to-cyan-200/70" />
                <div className="absolute -right-20 top-1/3 h-px w-40 bg-gradient-to-l from-transparent to-violet-200/60" />
                <div className="absolute -top-10 left-1/2 h-28 w-px bg-gradient-to-b from-cyan-200/70 to-transparent" />
                <Globe2 className="h-32 w-32 text-cyan-100 md:h-36 md:w-36" />

                <div className="absolute -right-5 top-16 flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/15 text-amber-100 shadow-lg shadow-amber-500/20">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div className="absolute bottom-16 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/15 text-emerald-100 shadow-lg shadow-emerald-500/20">
                  <RadioTower className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-2 right-16 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/15 text-cyan-100 shadow-lg shadow-cyan-500/20">
                  <Route className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="absolute left-6 top-28 z-10 w-[min(20rem,calc(100%-3rem))] rounded-3xl border border-white/10 bg-slate-950/82 p-5 backdrop-blur-xl md:left-8 md:top-32">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">Live scenario</div>
                  <div className="mt-2 text-xl font-semibold text-white">Emergency Response</div>
                </div>
                <ShieldAlert className="h-6 w-6 text-amber-200" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Unknown movement crosses an urban sensor gate. The engine turns detection into response choreography.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {heroMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
                    <div className="mt-1 text-sm font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 rounded-3xl border border-white/10 bg-slate-950/82 p-4 backdrop-blur-xl md:bottom-8 md:left-8 md:right-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Scenario timeline</div>
                  <div className="mt-1 text-sm font-semibold text-white">Chapter 02 · Sensor Detection</div>
                </div>

                <div className="grid flex-1 grid-cols-5 gap-2 lg:max-w-2xl">
                  {timelineSteps.map((step, index) => (
                    <div key={step} className="min-w-0">
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${index <= 1 ? "bg-cyan-300" : "bg-transparent"}`}
                          style={{ width: index === 1 ? "72%" : index < 1 ? "100%" : "0%" }}
                        />
                      </div>
                      <div className="mt-2 truncate text-[10px] font-medium text-slate-400">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute right-6 top-32 z-10 hidden w-64 rounded-3xl border border-white/10 bg-slate-950/82 p-5 backdrop-blur-xl lg:block">
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Engine layers</div>
              <div className="mt-4 space-y-3">
                {[
                  [Layers3, "Risk zones", "Danger + warning rings"],
                  [Eye, "Camera mode", "Focus → report"],
                  [Route, "Response path", "Unit route generated"],
                ].map(([Icon, title, detail]) => {
                  const LayerIcon = Icon as typeof Layers3;

                  return (
                    <div key={title as string} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <LayerIcon className="mt-0.5 h-4 w-4 text-cyan-200" />
                      <div>
                        <div className="text-sm font-semibold text-white">{title as string}</div>
                        <div className="text-xs text-slate-500">{detail as string}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
