import {
  Clock3,
  Globe2,
  Layers3,
  Presentation,
  Ruler,
  Shapes,
  type LucideIcon,
} from "lucide-react";

type StripItem = {
  icon: LucideIcon;
  label: string;
};

export function PositioningStrip() {
  const items: StripItem[] = [
    { icon: Globe2, label: "3D Earth Workspace" },
    { icon: Layers3, label: "Layer Management" },
    { icon: Shapes, label: "Drawing Tools" },
    { icon: Ruler, label: "Analysis Tools" },
    { icon: Clock3, label: "Timeline" },
    { icon: Presentation, label: "Presentation Output" },
  ];

  return (
    <section className="border-y border-white/10 bg-slate-950 px-5 py-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <Icon className="h-5 w-5 text-cyan-200" />
              <span className="text-sm text-slate-300">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
