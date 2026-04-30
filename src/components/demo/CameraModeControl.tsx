import type { DemoCameraMode } from "../../types/demo";

const cameraModes: DemoCameraMode[] = ["global", "focus", "follow", "report"];

export function CameraModeControl({ activeMode = "global" }: { activeMode?: DemoCameraMode }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cameraModes.map((mode) => (
        <span
          key={mode}
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            mode === activeMode
              ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
              : "border-white/10 bg-white/[0.04] text-slate-400"
          }`}
        >
          {mode}
        </span>
      ))}
    </div>
  );
}
