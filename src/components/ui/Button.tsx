import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "paypal";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200 shadow-lg shadow-cyan-500/20"
      : variant === "paypal"
        ? "bg-[#ffc439] text-slate-950 hover:bg-[#ffb800] shadow-lg shadow-yellow-500/20"
        : variant === "dark"
          ? "border border-white/10 bg-slate-950 text-white hover:bg-slate-900"
          : "border border-white/15 bg-white/10 text-white hover:bg-white/15 backdrop-blur";

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${variantClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
