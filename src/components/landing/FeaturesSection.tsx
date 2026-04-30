import { coreFeatures } from "../../data/features";
import { SectionHeader } from "../ui/SectionHeader";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-950 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          centered
          eyebrow="Core Features"
          title="Everything needed for geospatial scenario creation."
          description="ARAD Earth Studio combines map visualization, drawing, entities, inspection, analysis, animation, and presentation workflows."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10">
                  <Icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
