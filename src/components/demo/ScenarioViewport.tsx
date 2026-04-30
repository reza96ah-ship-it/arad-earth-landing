import { Globe2 } from "lucide-react";
import type { DemoScenario } from "../../types/demo";

export function ScenarioViewport({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.25),rgba(15,23,42,0.95)_42%,rgba(2,6,23,1)_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="absolute left-6 top-6 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
        3D Earth viewport placeholder
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-56 w-56 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20">
          <Globe2 className="h-24 w-24 text-cyan-100" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur">
        <div className="text-sm font-semibold text-white">{scenario.title}</div>
        <p className="mt-1 text-xs leading-5 text-slate-400">{scenario.businessValue}</p>
      </div>
    </div>
  );
}
