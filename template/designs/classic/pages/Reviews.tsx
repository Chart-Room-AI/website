import type { ClientConfig } from "@config/schema";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container, CtaBand, PageHeader, Stars } from "../components/ui";

/** Where full reviews can live; listed in this order when present in config.social. */
const reviewSites: Partial<Record<ClientConfig["social"][number]["platform"], string>> = {
  google: "Google",
  facebook: "Facebook",
  yelp: "Yelp",
  nextdoor: "Nextdoor",
};

/** Average rating summary, links to review sites, and every review from config.reviews. */
export function Reviews({ config }: DesignPageProps) {
  const { reviews, social, business } = config;
  const average = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const sites = Object.entries(reviewSites).flatMap(([platform, label]) => {
    const link = social.find((entry) => entry.platform === platform);
    return link ? [{ label, url: link.url }] : [];
  });

  return (
    <>
      <PageHeader title="Reviews" intro={business.tagline} />
      <Container className="pt-14 md:pt-20">
        {reviews.length > 0 ? (
          <>
            <section
              aria-labelledby="rating-summary"
              className="flex flex-col gap-6 rounded-2xl bg-primary/5 p-6 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div>
                <h2 id="rating-summary" className="sr-only">
                  Rating summary
                </h2>
                <p aria-hidden className="font-heading text-5xl font-semibold text-primary">
                  {average.toFixed(1)}
                </p>
                <Stars rating={Math.round(average * 10) / 10} showValue={false} className="mt-2" />
                <p className="mt-1 text-sm text-muted">
                  Average of {reviews.length} review{reviews.length === 1 ? "" : "s"} shown here
                </p>
              </div>
              {sites.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {sites.map((site) => (
                    <li key={site.url}>
                      <ButtonLink href={site.url} variant="secondary">
                        Read reviews on {site.label}
                        <span aria-hidden>↗</span>
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <h2 className="sr-only">All reviews</h2>
            <ul className="mt-10 gap-6 sm:columns-2 lg:columns-3">
              {reviews.map((review) => (
                <li key={review.author + review.text} className="mb-6 break-inside-avoid">
                  <figure className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <Stars rating={review.rating} />
                    <blockquote className="mt-3 leading-relaxed">“{review.text}”</blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-primary-ink">
                      {review.author}
                      {review.location ? <span className="font-normal text-muted"> · {review.location}</span> : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="max-w-xl text-lg text-muted">Reviews are coming soon.</p>
        )}
      </Container>
      <CtaBand config={config} />
    </>
  );
}
