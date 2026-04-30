import { Globe2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Demo", "#guided-demo"],
    ["Workflows", "#workflows"],
    ["Engine", "#engine"],
    ["Deployment", "#deployment"],
    ["Use Cases", "#use-cases"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 shadow-lg shadow-cyan-500/10">
            <Globe2 className="h-6 w-6 text-cyan-200" />
          </div>

          <div>
            <div className="text-lg font-bold tracking-wide">ARAD</div>
            <div className="-mt-1 text-xs text-slate-400">Earth Studio</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {links.map(([label, url]) => (
            <a key={label} href={url} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#guided-demo" variant="secondary">Launch Demo</Button>
          <Button href="#contact">Book Walkthrough</Button>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/10 bg-white/10 p-3 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-5 lg:hidden">
          <div className="grid gap-3">
            {links.map(([label, url]) => (
              <a
                key={label}
                href={url}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/5 px-4 py-3 text-slate-300"
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Book Walkthrough
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
