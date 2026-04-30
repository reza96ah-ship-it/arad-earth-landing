import type { DemoChapter } from "../../types/demo";

export function DemoTimeline({
  chapters,
  activeChapterId,
}: {
  chapters: DemoChapter[];
  activeChapterId?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Scenario Timeline
        </div>
        <div className="text-xs text-slate-500">Chapter skeleton</div>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
        {chapters.map((chapter, index) => {
          const active = chapter.id === activeChapterId;

          return (
            <div
              key={chapter.id}
              className={`rounded-2xl border p-3 ${
                active
                  ? "border-cyan-300/40 bg-cyan-300/10"
                  : "border-white/10 bg-slate-950/50"
              }`}
            >
              <div className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm font-semibold text-white">{chapter.shortTitle}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
