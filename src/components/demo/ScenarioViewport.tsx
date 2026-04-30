import { Globe2, Layers3, Play, RadioTower, Route, ShieldAlert } from "lucide-react";
import type { DemoChapter, DemoScenario } from "../../types/demo";

const iconMap = [ShieldAlert, RadioTower, Route];

export function ScenarioViewport({
  scenario,
  chapter,
}: {
  scenario: DemoScenario;
  chapter?: DemoChapter;
}) {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.24),rgba(15,23,42,0.95)_42%,rgba(2,6,23,1)_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="absolute left-5 right-5 top-5 z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
          <Play className="h-3.5 w-3.5" />
          Guided product tour
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur">
          <Layers3 className="h-3.5 w-3.5 text-cyan-200" />
          {scenario.region}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pb-28 pt-12">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20 md:h-80 md:w-80">
          <div className="absolute inset-6 rounded-full border border-cyan-200/20" />
          <div className="absolute inset-14 rounded-full border border-cyan-200/20" />
          <div className="absolute -left-14 top-1/2 h-px w-28 bg-gradient-to-r from-transparent to-cyan-200/60" />
          <div className="absolute -right-14 top-1/3 h-px w-28 bg-gradient-to-l from-transparent to-violet-200/50" />
          <Globe2 className="h-28 w-28 text-cyan-100 md:h-36 md:w-36" />

          {iconMap.map((Icon, index) => (
            <div
              key={index}
              className={`absolute flex h-10 w-10 items-center justify-center rounded-full border text-cyan-100 shadow-lg ${
                index === 0
                  ? "-right-4 top-16 border-amber-300/30 bg-amber-300/15 text-amber-100 shadow-amber-500/20"
                  : index === 1
                    ? "bottom-16 left-0 border-emerald-300/30 bg-emerald-300/15 text-emerald-100 shadow-emerald-500/20"
                    : "-bottom-2 right-16 border-cyan-300/30 bg-cyan-300/15 shadow-cyan-500/20"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-slate-950/85 p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">{scenario.title}</div>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {chapter?.title || "Scenario preview"}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              {chapter?.description || scenario.businessValue}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:min-w-56">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-slate-500">Camera</div>
              <div className="mt-1 font-semibold text-white">{chapter?.cameraMode || "global"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-slate-500">Visible items</div>
              <div className="mt-1 font-semibold text-white">
                {(chapter?.visibleObjects.length || 0) +
                  (chapter?.visibleRoutes.length || 0) +
                  (chapter?.visibleZones.length || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
