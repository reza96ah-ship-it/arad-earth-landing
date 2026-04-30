import type { DemoChapter, DemoScenario } from "../../types/demo";

export function DemoInspector({
  scenario,
  chapter,
}: {
  scenario: DemoScenario;
  chapter?: DemoChapter;
}) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Inspector
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{scenario.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{scenario.region}</p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
          <span className="text-slate-500">Mode</span>
          <span className="text-cyan-100">Guided</span>
        </div>
        <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
          <span className="text-slate-500">Camera</span>
          <span className="text-white">{chapter?.cameraMode || "global"}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Chapters</span>
          <span className="text-white">{scenario.chapters.length}</span>
        </div>
      </div>
    </aside>
  );
}
