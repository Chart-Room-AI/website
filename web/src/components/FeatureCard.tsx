import Link from "next/link";

type FeatureCardProps = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export function FeatureCard({ title, body, href, linkLabel = "Learn more" }: FeatureCardProps) {
  return (
    <article className="rounded-xl border border-chart-navy/10 bg-white p-7 shadow-sm">
      <h3 className="text-xl font-bold tracking-tight text-chart-navy">{title}</h3>
      <p className="mt-3 leading-relaxed text-chart-ink/90">{body}</p>
      {href ? (
        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 transition hover:text-chart-navy"
        >
          {linkLabel}
        </Link>
      ) : null}
    </article>
  );
}
