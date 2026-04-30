import { useCases } from "../../content/landing";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Use Cases
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Built for operational and executive audiences.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-lg font-semibold text-white"
            >
              {useCase}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
