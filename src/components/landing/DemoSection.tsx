import { useState } from "react";
import { Eye, Layers3, PanelRight, Play } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const tools = [
  "Circle",
  "Polygon",
  "Rectangle",
  "Polyline",
  "Cylinder",
  "Sphere",
  "Prism",
  "Model",
  "Beam",
  "Ruler",
  "Viewshed",
  "Timeline",
];

export function DemoSection() {
  const [selectedTool, setSelectedTool] = useState("Circle");

  return (
    <section id="demo" className="bg-[#020617] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Interactive Product Demo"
          title="Experience the Studio Interface."
          description="This section will become the book-based working studio demo. Phase 1 creates the visual skeleton; Phase 3 makes tools functional."
        />

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
          <div className="flex h-12 items-center justify-between border-b border-white/10 bg-slate-900 px-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-slate-300">ARAD Earth Studio Demo</span>
            </div>

            <div className="hidden gap-5 text-xs text-slate-400 md:flex">
              <span>File</span>
              <span>Drawing</span>
              <span>Tools</span>
              <span>Map</span>
              <span>Animation</span>
              <span>View</span>
            </div>
          </div>

          <div className="grid min-h-[620px] lg:grid-cols-[250px_1fr_270px]">
            <div className="border-b border-white/10 bg-slate-900/70 p-4 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-100">
                <Play className="h-4 w-4" />
                Tools
              </div>

              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className={`rounded-xl border px-3 py-2 text-xs transition ${
                      selectedTool === tool
                        ? "border-cyan-300 bg-cyan-300/15 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Active Tool
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {selectedTool}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Functional object creation is added in Phase 3.
                </p>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden bg-[#05080d] page-grid">
              <div className="demo-radial-glow absolute inset-0" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full earth-placeholder shadow-[0_0_70px_rgba(34,211,238,0.28)] md:h-96 md:w-96">
                <div className="absolute inset-0 rounded-full earth-night-shadow" />
                <div className="orbit-spin absolute inset-[-44px] rounded-full border border-cyan-300/25" />
              </div>

              <div className="float-soft absolute left-[18%] top-[22%] rounded-2xl border border-cyan-300/20 bg-slate-950/75 p-3 text-xs text-cyan-100 backdrop-blur">
                Tehran Scenario Layer
              </div>

              <div className="float-soft-delay absolute bottom-[20%] right-[18%] rounded-2xl border border-blue-300/20 bg-slate-950/75 p-3 text-xs text-blue-100 backdrop-blur">
                Timeline: Keyframe 03
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/75 p-4 backdrop-blur">
                <div className="mb-2 flex justify-between text-xs text-slate-400">
                  <span>Timeline</span>
                  <span>Playhead 42%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[42%] rounded-full bg-cyan-300" />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-slate-900/70 p-4 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-100">
                <PanelRight className="h-4 w-4" />
                Inspector
              </div>

              <div className="space-y-3">
                {[
                  ["Name", `${selectedTool} Object`],
                  ["Type", selectedTool],
                  ["Latitude", "35.6892°"],
                  ["Longitude", "51.3890°"],
                  ["Color", "#22D3EE"],
                  ["Opacity", "85%"],
                  ["Animation", "Enabled"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-200">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100">
                  <Layers3 className="h-4 w-4" />
                  Entities
                </div>
                {["Global", "Map Layers", "Drawing Objects", "3D Objects", "Analysis"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-white/5 py-2 text-xs text-slate-400 last:border-b-0"
                    >
                      <span>{item}</span>
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
