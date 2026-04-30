import type { DemoChapter } from "../../types/demo";

export function ChapterNarrator({ chapter }: { chapter?: DemoChapter }) {
  if (!chapter) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">
        Scenario chapters will appear here as each story is authored.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        Current Chapter
      </div>
      <h3 className="mt-3 text-xl font-semibold text-white">{chapter.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{chapter.description}</p>
      <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
        {chapter.businessInsight}
      </p>
    </div>
  );
}
