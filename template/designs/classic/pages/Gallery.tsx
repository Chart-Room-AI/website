import type { DesignPageProps } from "../../types";
import { Container, CtaBand, PageHeader, Photo } from "../components/ui";

/** config.gallery as a responsive grid, cropped to the brand kit's gallery aspect ratio. */
export function Gallery({ config }: DesignPageProps) {
  const { gallery, brand, serviceArea } = config;
  const ratio = brand.imageDirection.aspectRatios.gallery;
  return (
    <>
      <PageHeader title="Gallery" intro={serviceArea.summary} />
      <Container className="pt-14 md:pt-20">
        {gallery.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo, index) => (
              <li key={photo.file}>
                <figure>
                  <Photo
                    config={config}
                    image={photo}
                    ratio={ratio}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={index < 3}
                  />
                  {photo.caption ? <figcaption className="mt-3 text-sm text-muted">{photo.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-xl text-lg text-muted">Project photos are on the way. In the meantime, ask us for examples of similar work.</p>
        )}
      </Container>
      <CtaBand config={config} />
    </>
  );
}
