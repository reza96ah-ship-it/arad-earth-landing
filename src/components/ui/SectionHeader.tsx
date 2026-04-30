import { Badge } from "./Badge";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <Badge>{eyebrow}</Badge>

      <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-400">{description}</p>
      )}
    </div>
  );
}
