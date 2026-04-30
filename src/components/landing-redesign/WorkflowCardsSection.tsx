import { workflows } from "../../content/landing";

export function WorkflowCardsSection() {
  return (
    <section id="workflows" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            What ARAD Earth Does
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Four workflows. One scenario engine.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {workflows.map((workflow) => (
            <article
              key={workflow.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-white">{workflow.title}</h3>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-400">
                <p><span className="text-slate-200">Problem:</span> {workflow.problem}</p>
                <p><span className="text-slate-200">ARAD:</span> {workflow.action}</p>
                <p><span className="text-cyan-100">Result:</span> {workflow.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
