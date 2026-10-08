import Image from "next/image";
import { assetUrl } from "@config/assets";
import type { DesignPageProps } from "../../types";
import { Container, PageHeader } from "../components/ui";

/** Stub (first slice of #21): renders config.gallery in a grid. */
export function Gallery({ config }: DesignPageProps) {
  return (
    <>
      <PageHeader title="Gallery" intro={config.business.tagline} />
      <Container className="py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.gallery.map((photo) => (
            <li key={photo.file}>
              <figure>
                <Image src={assetUrl(config.id, photo.file)} alt={photo.alt} width={photo.width} height={photo.height} className="h-auto w-full rounded-xl" />
                {photo.caption ? <figcaption className="mt-2 text-sm text-foreground/70">{photo.caption}</figcaption> : null}
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
