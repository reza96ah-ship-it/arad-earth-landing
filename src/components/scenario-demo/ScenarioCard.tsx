import type { Scenario } from "../../types/scenario";

type ScenarioCardProps = {
  scenario: Scenario;
  active: boolean;
  onSelect: () => void;
};

export function ScenarioCard({ scenario, active, onSelect }: ScenarioCardProps) {
  const Icon = scenario.icon;

  return (
    <button
      onClick={onSelect}
      className={`group rounded-2xl border p-3 text-left transition ${
        active
          ? "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_24px_rgba(34,211,238,0.14)]"
          : "border-white/10 bg-white/[0.04] hover:border-cyan-300/30 hover:bg-white/[0.07]"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: `${scenario.accentColor}22` }}
          >
            <Icon className="h-4 w-4" style={{ color: scenario.accentColor }} />
          </div>

          <div>
            <div className="text-xs font-semibold text-white">
              {scenario.shortTitle}
            </div>
            <div className="text-[10px] text-slate-500">{scenario.region}</div>
          </div>
        </div>

        {active && (
          <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[9px] font-bold text-slate-950">
            ACTIVE
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-[11px] leading-5 text-slate-400">
        {scenario.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {scenario.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
