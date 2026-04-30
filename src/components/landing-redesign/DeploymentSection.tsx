import { deploymentOptions } from "../../content/landing";

export function DeploymentSection() {
  return (
    <section id="deployment" className="px-5 py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Deployment & Trust
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Designed for controlled environments.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Deployment is a core product differentiator, especially for organizations that need private infrastructure, local networks, or offline readiness.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {deploymentOptions.map((option) => (
            <article key={option.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-lg font-semibold text-white">{option.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{option.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
