import { Pause, Play, RotateCcw } from "lucide-react";
import type { CameraMode, Scenario } from "../../types/scenario";
import { CameraModeControl } from "./CameraModeControl";

type ScenarioTimelineProps = {
  scenario: Scenario;
  isPlaying: boolean;
  progress: number;
  activePhaseIndex: number;
  cameraMode: CameraMode;
  onTogglePlay: () => void;
  onReset: () => void;
  onCameraModeChange: (mode: CameraMode) => void;
  onJumpToPhase: (index: number) => void;
};

function formatTime(progress: number) {
  const totalSeconds = 60;
  const current = Math.round(progress * totalSeconds);
  const mm = String(Math.floor(current / 60)).padStart(2, "0");
  const ss = String(current % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function ScenarioTimeline({
  scenario,
  isPlaying,
  progress,
  activePhaseIndex,
  cameraMode,
  onTogglePlay,
  onReset,
  onCameraModeChange,
  onJumpToPhase,
}: ScenarioTimelineProps) {
  return (
    <div className="border-t border-white/10 p-4">
      <div className="hero-glass-panel rounded-2xl p-4">
        <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-slate-950 hover:bg-cyan-200"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={onReset}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <div>
              <div className="text-xs font-semibold text-white">
                {scenario.phases[activePhaseIndex]}
              </div>
              <div className="text-[11px] text-slate-500">
                {formatTime(progress)} / 01:00
              </div>
            </div>
          </div>

          <CameraModeControl
            cameraMode={cameraMode}
            onChange={onCameraModeChange}
          />
        </div>

        <div className="relative h-3 rounded-full bg-white/10">
          <div
            className="absolute left-0 top-0 h-3 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.7)]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />

          {scenario.phases.map((phase, index) => {
            const left =
              scenario.phases.length === 1
                ? 0
                : (index / (scenario.phases.length - 1)) * 100;

            return (
              <button
                key={phase}
                onClick={() => onJumpToPhase(index)}
                className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full"
                style={{
                  left: `${left}%`,
                  background:
                    index <= activePhaseIndex
                      ? scenario.accentColor
                      : "rgba(255,255,255,0.25)",
                }}
                title={phase}
              />
            );
          })}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {scenario.phases.map((phase, index) => (
            <button
              key={phase}
              onClick={() => onJumpToPhase(index)}
              className={`rounded-lg border px-2 py-1.5 text-[10px] transition ${
                index === activePhaseIndex
                  ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-slate-500 hover:bg-white/[0.06]"
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
