import { Crosshair, Eye, Focus, PanelRight } from "lucide-react";
import type { Scenario, ScenarioObject } from "../../types/scenario";

type ScenarioInspectorProps = {
  scenario: Scenario;
  selectedObject: ScenarioObject;
  activePhase: string;
  progress: number;
};

export function ScenarioInspector({
  scenario,
  selectedObject,
  activePhase,
  progress,
}: ScenarioInspectorProps) {
  const properties = Object.entries(selectedObject.properties);

  return (
    <aside className="hero-glass-panel rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100">
        <PanelRight className="h-4 w-4" />
        Inspector
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500">
          Selected Object
        </div>

        <div className="mt-2 text-sm font-semibold text-white">
          {selectedObject.name}
        </div>

        <div className="mt-1 text-[11px] capitalize text-slate-400">
          {selectedObject.type}
        </div>

        <div
          className="mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
          style={{
            background: `${selectedObject.color}22`,
            color: selectedObject.color,
          }}
        >
          {selectedObject.status}
        </div>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-400">
          <span>Latitude</span>
          <span className="font-mono text-white">
            {selectedObject.lat.toFixed(4)}°
          </span>
        </div>

        <div className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-400">
          <span>Longitude</span>
          <span className="font-mono text-white">
            {selectedObject.lon.toFixed(4)}°
          </span>
        </div>

        {properties.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-400"
          >
            <span>{key}</span>
            <span className="text-right text-white">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500">
          Current Phase
        </div>
        <div className="mt-2 text-sm font-semibold text-white">
          {activePhase}
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10">
          <div
            className="h-1.5 rounded-full bg-cyan-300"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Focus", Focus],
          ["Inspect", Crosshair],
          ["Hide", Eye],
        ].map(([label, Icon]) => {
          const RealIcon = Icon as typeof Focus;

          return (
            <button
              key={label as string}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-[10px] text-slate-300 hover:bg-white/[0.08]"
            >
              <RealIcon className="mx-auto mb-1 h-3.5 w-3.5 text-cyan-200" />
              {label as string}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] leading-5 text-slate-400">
        <span className="text-cyan-100">{scenario.shortTitle}</span> scenario
        is running in guided demo mode.
      </div>
    </aside>
  );
}
