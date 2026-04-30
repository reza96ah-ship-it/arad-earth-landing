import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
      <Sparkles className="h-4 w-4" />
      {children}
    </span>
  );
}
