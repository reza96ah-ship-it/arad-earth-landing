import type { DemoReport } from "../../types/demo";

export function DemoReportCard({ report }: { report: DemoReport }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Final Report
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{report.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{report.summary}</p>

      {report.recommendation && (
        <p className="mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-50">
          {report.recommendation}
        </p>
      )}
    </div>
  );
}
