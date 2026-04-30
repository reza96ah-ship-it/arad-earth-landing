import {
  Activity,
  ArrowRight,
  Globe2,
  RadioTower,
  Route,
  ShieldAlert,
} from "lucide-react";
import { heroContent } from "../../content/landing";
import { Button } from "../ui/Button";

const timelineSteps = ["Context", "Detection", "Analysis", "Action", "Report"];

export function NewHeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_85%_25%,rgba(124,58,237,0.16),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,1)_88%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
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

        <div className="mx-auto mt-14 max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950/75 p-3 shadow-2xl shadow-cyan-950/40 backdrop-blur md:p-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 text-left">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10">
                  <Activity className="h-5 w-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">ARAD Earth Engine</div>
                  <div className="text-xs text-slate-500">Guided scenario preview</div>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100 sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Online
              </div>
            </div>

            <div className="grid min-h-[520px] gap-0 lg:grid-cols-[300px_minmax(0,1fr)]">
              <aside className="border-b border-white/10 bg-slate-950/80 p-5 lg:border-b-0 lg:border-r">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">Live scenario</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">Emergency Response</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Unknown movement crosses an urban sensor gate. The engine turns detection into a clear response story.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    [ShieldAlert, "Threat status", "Confirmed"],
                    [RadioTower, "Sensor confidence", "87%"],
                    [Route, "Primary unit ETA", "12 min"],
                  ].map(([Icon, label, value]) => {
                    const ItemIcon = Icon as typeof ShieldAlert;

                    return (
                      <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
                          <ItemIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">{label as string}</div>
                          <div className="text-sm font-semibold text-white">{value as string}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </aside>

              <div className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.22),rgba(15,23,42,0.94)_42%,rgba(2,6,23,1)_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center pb-24">
                  <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20 md:h-88 md:w-88">
                    <div className="absolute inset-6 rounded-full border border-cyan-200/20" />
                    <div className="absolute inset-14 rounded-full border border-cyan-200/20" />
                    <div className="absolute -left-16 top-1/2 h-px w-32 bg-gradient-to-r from-transparent to-cyan-200/60" />
                    <div className="absolute -right-16 top-1/3 h-px w-32 bg-gradient-to-l from-transparent to-violet-200/50" />
                    <Globe2 className="h-32 w-32 text-cyan-100 md:h-36 md:w-36" />

                    <div className="absolute -right-4 top-16 flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/15 text-amber-100 shadow-lg shadow-amber-500/20">
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

                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Scenario timeline</div>
                      <div className="mt-1 text-sm font-semibold text-white">Chapter 02 · Sensor Detection</div>
                    </div>
                    <div className="text-xs text-cyan-100">Guided mode</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
