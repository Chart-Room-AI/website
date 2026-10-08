import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@config/assets";
import type { BrandKit } from "@config/brand-kit";
import type { ClientConfig } from "@config/schema";
import { telHref } from "@/lib/contact";
import { quoteHref } from "@/lib/routes";
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

/**
 * Star rating. The stars are decorative (accent colors often sit below 3:1 on
 * the surface), so the rating is also shown and announced as text.
 */
export function Stars({ rating, showValue = true, className = "" }: { rating: number; showValue?: boolean; className?: string }) {
  const filled = Math.round(rating);
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <span aria-hidden className="text-lg tracking-wider text-accent">
        {"★".repeat(filled)}
        <span className="text-foreground/20">{"★".repeat(5 - filled)}</span>
      </span>
      <span className={showValue ? "text-sm font-semibold text-foreground/70" : "sr-only"}>
        <span className="sr-only">Rated </span>
        {Number.isInteger(rating) ? rating : rating.toFixed(1)}
        <span className="sr-only"> out of 5 stars</span>
        <span aria-hidden>/5</span>
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

/** "4:3" (brand kit aspect ratio) -> "4 / 3" (CSS aspect-ratio). */
export function cssAspectRatio(ratio: string): string {
  const [w, h] = ratio.split(":");
  return `${w} / ${h}`;
}

/** Photo corners follow the brand kit's icon corners (sharp vs rounded). */
export function photoCornerClass(iconStyle: BrandKit["iconStyle"]): string {
  return iconStyle.corners === "sharp" ? "rounded-none" : "rounded-2xl";
}

type PhotoProps = {
  config: ClientConfig;
  image: { file: string; alt: string; width: number; height: number };
  /** Brand kit ratio, e.g. brand.imageDirection.aspectRatios.gallery. */
  ratio: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** A client photo cropped (object-cover) to the brand kit's aspect ratio. */
export function Photo({ config, image, ratio, sizes, priority, className = "" }: PhotoProps) {
  return (
    <div
      className={`overflow-hidden bg-primary/10 ${photoCornerClass(config.brand.iconStyle)} ${className}`}
      style={{ aspectRatio: cssAspectRatio(ratio) }}
    >
      <Image
        src={assetUrl(config.id, image.file)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Closing call to action: service area, quote button and click-to-call. */
export function CtaBand({ config, title }: { config: ClientConfig; title?: string }) {
  const { serviceArea, hero, contact } = config;
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-8 rounded-2xl bg-accent/10 p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-primary">{title ?? serviceArea.summary}</h2>
            <p className="mt-3 text-foreground/80">{serviceArea.places.join(" · ")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href={quoteHref}>{hero.quoteCtaLabel}</ButtonLink>
            <ButtonLink href={telHref(contact.phone)} variant="outline">
              Call {contact.phone}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Stable in-page anchor for a service name. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
