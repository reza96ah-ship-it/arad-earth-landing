import type { DemoChapter } from "../../types/demo";

export function DemoTimeline({
  chapters,
  activeChapterId,
  onSelectChapter,
}: {
  chapters: DemoChapter[];
  activeChapterId?: string;
  onSelectChapter: (index: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Scenario Timeline
          </div>
          <div className="mt-1 text-sm text-slate-400">Click a chapter to preview the story state.</div>
        </div>
        <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 sm:block">
          Guided Mode
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
        {chapters.map((chapter, index) => {
          const active = chapter.id === activeChapterId;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(index)}
              className={`rounded-2xl border p-3 text-left transition ${
                active
                  ? "border-cyan-300/40 bg-cyan-300/10 shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm font-semibold text-white">{chapter.shortTitle}</div>
              <div className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate-500">
                {chapter.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
