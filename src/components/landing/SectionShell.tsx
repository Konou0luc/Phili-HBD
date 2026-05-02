import type { ReactNode } from "react";

type Variant = "base" | "band" | "roseWash" | "finale";

const shells: Record<Variant, string> = {
  base: "",
  band: "border-y border-zinc-300/40 bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
  roseWash:
    "bg-[radial-gradient(ellipse_95%_65%_at_50%_-15%,rgba(232,180,188,0.2),transparent_55%)]",
  finale:
    "border-t border-zinc-300/35 bg-gradient-to-b from-white/30 via-[var(--color-cloud)] to-[#ebe4e8]",
};

type Props = {
  id?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  constrained?: boolean;
};

export function SectionShell({
  id,
  variant = "base",
  className = "",
  children,
  constrained = true,
}: Props) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-24 py-16 md:py-24 lg:py-30 ${shells[variant]} ${className}`}
    >
      <div
        className={
          constrained
            ? "mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12"
            : "w-full"
        }
      >
        {children}
      </div>
    </section>
  );
}
