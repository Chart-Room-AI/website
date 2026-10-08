import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "outline-light" | "outline";
  className?: string;
};

const buttonStyles = {
  accent: "bg-accent text-on-accent shadow-lg shadow-black/10 hover:brightness-95",
  "outline-light": "border border-on-primary/40 text-on-primary hover:bg-on-primary/10",
  outline: "border border-primary/30 text-primary hover:bg-primary/5",
} as const;

/** Internal routes use next/link; tel:, mailto: and external links use <a>. */
export function ButtonLink({ href, children, variant = "accent", className = "" }: ButtonLinkProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold transition ${buttonStyles[variant]} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-primary md:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-lg leading-relaxed text-foreground/80">{children}</div> : null}
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-lg tracking-wider text-accent" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden>{"★".repeat(rating)}</span>
      <span aria-hidden className="text-foreground/20">
        {"★".repeat(5 - rating)}
      </span>
    </p>
  );
}

/** Title band at the top of inner pages. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="bg-primary text-on-primary">
      <Container className="py-14 md:py-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-on-primary/80">{intro}</p> : null}
      </Container>
    </section>
  );
}
