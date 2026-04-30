import type { DemoScenario } from "../../types/demo";

export function ScenarioChooser({
  scenarios,
  activeScenarioId,
}: {
  scenarios: DemoScenario[];
  activeScenarioId: string;
}) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Choose Scenario
      </div>

      <div className="mt-4 space-y-3">
        {scenarios.map((scenario) => {
          const active = scenario.id === activeScenarioId;

          return (
            <button
              key={scenario.id}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-cyan-300/40 bg-cyan-300/10"
                  : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="text-sm font-semibold text-white">{scenario.title}</div>
              <div className="mt-1 text-xs text-slate-500">{scenario.category}</div>
              <p className="mt-3 text-xs leading-5 text-slate-400">{scenario.summary}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
