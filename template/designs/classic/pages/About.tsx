import type { DesignPageProps } from "../../types";
import { Container, PageHeader } from "../components/ui";

/** Stub (first slice of #21): renders config.about. */
export function About({ config }: DesignPageProps) {
  const { about } = config;
  return (
    <>
      <PageHeader title={about.heading} />
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {about.highlights.length > 0 ? (
          <ul className="space-y-3">
            {about.highlights.map((item) => (
              <li key={item} className="rounded-lg bg-accent/10 px-4 py-3 font-semibold text-primary">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  );
}
