import type { ScenarioLayerKey, ScenarioLayers } from "../../types/scenario";

type LayerTogglesProps = {
  layers: ScenarioLayers;
  onToggle: (key: ScenarioLayerKey) => void;
};

const layerLabels: Record<ScenarioLayerKey, string> = {
  pins: "Pins",
  routes: "Routes",
  zones: "Zones",
  models: "Models",
  labels: "Labels",
};

export function LayerToggles({ layers, onToggle }: LayerTogglesProps) {
  const keys = Object.keys(layers) as ScenarioLayerKey[];

  return (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        Layers
      </div>

      <div className="grid grid-cols-2 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 text-[11px] transition ${
              layers[key]
                ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                : "border-white/10 bg-white/[0.04] text-slate-500"
            }`}
          >
            {layerLabels[key]}
            <span
              className={`h-2 w-2 rounded-full ${
                layers[key] ? "bg-cyan-300" : "bg-slate-700"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
