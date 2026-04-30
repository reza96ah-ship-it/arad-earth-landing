import { ChevronRight } from "lucide-react";
import { workflowSteps } from "../../data/features";
import { SectionHeader } from "../ui/SectionHeader";

export function WorkflowSection() {
  return (
    <section id="workflow" className="bg-[#020617] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Professional Workflow"
          title="From raw map idea to cinematic presentation."
          description="The product workflow follows a clear studio process: project, data, objects, analysis, animation, and presentation."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <div
              key={step}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
                {index + 1}
              </div>
              <div className="font-semibold">{step}</div>
              <ChevronRight className="absolute right-4 top-7 hidden h-5 w-5 text-slate-600 lg:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
