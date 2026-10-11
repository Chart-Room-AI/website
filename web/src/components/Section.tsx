import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-chart-navy/5 bg-chart-surface">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 lg:max-w-6xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-chart-teal">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 max-w-2xl text-balance font-bold tracking-tight text-chart-navy text-3xl md:text-4xl">
            {title}
          </h2>
        ) : null}
        <div className={title || eyebrow ? "mt-8" : undefined}>{children}</div>
      </div>
    </section>
  );
}
