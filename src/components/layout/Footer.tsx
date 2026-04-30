import { Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020617] px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10">
              <Globe2 className="h-6 w-6 text-cyan-200" />
            </div>
            <div>
              <div className="font-bold">ARAD Earth Studio</div>
              <div className="text-sm text-slate-500">
                Professional geospatial visualization software.
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Build, animate, analyze, and present Earth-based scenarios through a professional studio workflow.
          </p>
        </div>

        <div className="grid gap-8 text-sm text-slate-500 sm:grid-cols-3">
          <div>
            <div className="mb-3 font-semibold text-white">Product</div>
            <div className="grid gap-2">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#demo" className="hover:text-white">Demo</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
            </div>
          </div>

          <div>
            <div className="mb-3 font-semibold text-white">Solutions</div>
            <div className="grid gap-2">
              <span>Mission Planning</span>
              <span>Urban Planning</span>
              <span>Training</span>
            </div>
          </div>

          <div>
            <div className="mb-3 font-semibold text-white">Company</div>
            <div className="grid gap-2">
              <a href="#contact" className="hover:text-white">Contact</a>
              <span>Support</span>
              <span>Documentation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-600">
        © 2026 ARAD Earth Studio. All rights reserved.
      </div>
    </footer>
  );
}
