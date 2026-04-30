type DemoMode = {
  name: string;
  description: string;
};

export function DemoActions({ modes }: { modes: DemoMode[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Demo Modes
      </div>

      <div className="mt-4 space-y-3">
        {modes.map((mode, index) => (
          <div key={mode.name} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-white">{mode.name}</h4>
              {index === 0 && (
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold text-cyan-100">
                  Default
                </span>
              )}
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
