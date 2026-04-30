import { RotateCcw, Play, Pause } from "lucide-react";
import { scenarios } from "../../data/scenarios";
import type {
  Scenario,
  ScenarioId,
  ScenarioLayerKey,
  ScenarioLayers,
} from "../../types/scenario";
import { ScenarioCard } from "./ScenarioCard";
import { LayerToggles } from "./LayerToggles";

type ScenarioPanelProps = {
  activeScenario: Scenario;
  layers: ScenarioLayers;
  isPlaying: boolean;
  onSelectScenario: (id: ScenarioId) => void;
  onToggleLayer: (key: ScenarioLayerKey) => void;
  onTogglePlay: () => void;
  onReset: () => void;
};

export function ScenarioPanel({
  activeScenario,
  layers,
  isPlaying,
  onSelectScenario,
  onToggleLayer,
  onTogglePlay,
  onReset,
}: ScenarioPanelProps) {
  return (
    <aside className="hero-glass-panel rounded-2xl p-4">
      <div className="mb-3">
        <div className="text-sm font-semibold text-cyan-100">
          Scenario Library
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          Choose a guided workflow
        </div>
      </div>

      <div className="grid gap-2">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            active={scenario.id === activeScenario.id}
            onSelect={() => onSelectScenario(scenario.id)}
          />
        ))}
      </div>

      <div className="my-4 border-t border-white/10" />

      <LayerToggles layers={layers} onToggle={onToggleLayer} />

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={onTogglePlay}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-3 py-2 text-[11px] font-semibold text-slate-950 hover:bg-cyan-200"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-slate-300 hover:bg-white/[0.08]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </aside>
  );
}
