import type { DesignPageProps } from "../../types";
import { Container, PageHeader, Stars } from "../components/ui";

/** Stub (first slice of #21): lists config.reviews. */
export function Reviews({ config }: DesignPageProps) {
  return (
    <>
      <PageHeader title="Reviews" intro={config.business.tagline} />
      <Container className="py-14">
        <ul className="grid gap-6 md:grid-cols-2">
          {config.reviews.map((review) => (
            <li key={review.author + review.text} className="rounded-xl border border-primary/10 bg-white/60 p-6">
              <Stars rating={review.rating} />
              <blockquote className="mt-3 leading-relaxed">“{review.text}”</blockquote>
              <p className="mt-4 text-sm font-semibold text-primary">
                {review.author}
                {review.location ? <span className="font-normal text-foreground/70"> · {review.location}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
