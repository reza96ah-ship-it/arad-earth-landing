import { engineCapabilities } from "../../content/landing";

export function EngineCapabilitiesSection() {
  return (
    <section id="engine" className="px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Scenario Engine
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Built around timelines, cameras, layers, and reports.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            This section replaces generic SaaS feature cards with engine-language capabilities that explain how ARAD Earth Studio works.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {engineCapabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-slate-200"
            >
              {capability}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
