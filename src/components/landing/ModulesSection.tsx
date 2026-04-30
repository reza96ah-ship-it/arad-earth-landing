import { productModules } from "../../data/features";
import { SectionHeader } from "../ui/SectionHeader";

export function ModulesSection() {
  return (
    <section id="modules" className="bg-slate-950 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          centered
          eyebrow="Product Modules"
          title="A product structure based on the real ARAD Earth Studio workflow."
          description="Each module will become a working landing-page demo component in the next phases."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {productModules.map((module, index) => (
            <div key={module} className="rounded-3xl border border-white/10 bg-[#020617] p-6">
              <div className="mb-5 text-sm font-mono text-cyan-200">
                Module {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold">{module}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Demo area prepared. Functional interaction will be added step by step.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
