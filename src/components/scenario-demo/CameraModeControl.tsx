import type { CameraMode } from "../../types/scenario";

type CameraModeControlProps = {
  cameraMode: CameraMode;
  onChange: (mode: CameraMode) => void;
};

const modes: { id: CameraMode; label: string }[] = [
  { id: "global", label: "Global" },
  { id: "focus", label: "Focus" },
  { id: "follow", label: "Follow" },
  { id: "report", label: "Report" },
];

export function CameraModeControl({
  cameraMode,
  onChange,
}: CameraModeControlProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`rounded-lg px-3 py-1.5 text-[11px] transition ${
            cameraMode === mode.id
              ? "bg-cyan-300 text-slate-950"
              : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
