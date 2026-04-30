import { ShieldCheck } from "lucide-react";
import { useCases } from "../../data/features";
import { SectionHeader } from "../ui/SectionHeader";

export function UseCasesSection() {
  return (
    <section className="bg-[#020617] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for teams that think spatially."
          description="ARAD Earth Studio is useful wherever geospatial context, visual planning, and scenario presentation are important."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <ShieldCheck className="h-8 w-8 text-cyan-200" />
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
