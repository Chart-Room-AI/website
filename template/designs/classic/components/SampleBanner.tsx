/** Shown on every page when config.sample is true, so placeholder content is never mistaken for real. */
export function SampleBanner() {
  return (
    <div className="bg-foreground px-4 py-2 text-center text-sm font-medium text-surface">
      Sample site: placeholder content for the client site template. Not a real business listing.
    </div>
  );
}
