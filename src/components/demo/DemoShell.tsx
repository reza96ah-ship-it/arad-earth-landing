import type { ReactNode } from "react";
import { demoCopy } from "../../content/demoCopy";

export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            {demoCopy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {demoCopy.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            {demoCopy.description}
          </p>
        </div>

        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
          Skeleton first · Cesium refactor later
        </div>
      </div>

      {children}
    </div>
  );
}
