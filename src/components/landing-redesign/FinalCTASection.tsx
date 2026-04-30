import { ArrowRight } from "lucide-react";
import { finalCta } from "../../content/landing";
import { Button } from "../ui/Button";

export function FinalCTASection() {
  return (
    <section id="contact" className="px-5 py-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center shadow-2xl shadow-cyan-950/30 md:p-14">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          {finalCta.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">
          {finalCta.description}
        </p>
        <div className="mt-8">
          <Button href="mailto:demo@arad-earth.local">
            {finalCta.cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
