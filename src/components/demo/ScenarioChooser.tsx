import type { DemoScenario } from "../../types/demo";

export function ScenarioChooser({
  scenarios,
  activeScenarioId,
  onSelectScenario,
}: {
  scenarios: DemoScenario[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
}) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Scenario Library
          </div>
          <div className="mt-2 text-lg font-semibold text-white">Choose a product story</div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {scenarios.map((scenario, index) => {
          const active = scenario.id === activeScenarioId;

          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-cyan-300/40 bg-cyan-300/10 shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">{scenario.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{scenario.category}</div>
                </div>
                <div className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-400">{scenario.summary}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
