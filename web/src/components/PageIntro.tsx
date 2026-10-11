import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="border-b border-chart-navy/10 bg-chart-surface">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20 lg:max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-chart-navy md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl text-lg leading-relaxed text-chart-ink md:text-xl">
          {children}
        </div>
      </div>
    </section>
  );
}
