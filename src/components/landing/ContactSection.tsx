import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../ui/SectionHeader";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-[#020617] px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="Contact Us"
            title="Request a product demo or deployment consultation."
            description="Tell us about your organization, use case, and required modules. We can help you plan the best ARAD Earth Studio configuration."
          />

          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="h-5 w-5 text-cyan-200" />
              hello@aradearthstudio.com
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="h-5 w-5 text-cyan-200" />
              +1 000 000 0000
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin className="h-5 w-5 text-cyan-200" />
              Available for professional deployment consultation
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="rounded-[2rem] border border-white/10 bg-slate-950 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="Full name" />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="Email" />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="Phone" />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60" placeholder="Organization" />
          </div>

          <select className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-300/60">
            <option>Need: Product Demo</option>
            <option>Need: License Purchase</option>
            <option>Need: Enterprise Deployment</option>
            <option>Need: Training / Education</option>
            <option>Need: Custom Module</option>
          </select>

          <textarea
            className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60"
            placeholder="Tell us about your project..."
          />

          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-200">
            <Send className="h-4 w-4" />
            Send Request
          </button>

          {sent && (
            <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-200">
              Request received in demo mode. Later we can connect this to email/API.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
