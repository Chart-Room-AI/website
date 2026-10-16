/**
 * The origin used for metadataBase, canonical and Open Graph URLs.
 *
 * `config.seo.siteUrl` is the client's real domain, but before launch (and on
 * every preview) it either doesn't serve this build or is a placeholder like
 * dry-creek-sample.example.com. Absolute og:image URLs then point at a host
 * that can't serve them, and link previews show no image. So:
 *
 * - Vercel production: the configured siteUrl, unless it's a placeholder; then
 *   the project's production URL (VERCEL_PROJECT_PRODUCTION_URL).
 * - Vercel preview/development: this branch's stable URL (VERCEL_BRANCH_URL),
 *   else this deployment's URL (VERCEL_URL).
 * - Local: the configured siteUrl, or http://localhost:<PORT|3000> for a
 *   placeholder.
 *
 * These are Vercel system env vars (hostnames, not secrets), read at build time.
 */

const PLACEHOLDER_HOST = /(^|\.)(example\.(com|net|org)|localhost)$|\.(example|test|invalid|localhost)$/i;

export function isPlaceholderSiteUrl(siteUrl: string): boolean {
  return PLACEHOLDER_HOST.test(new URL(siteUrl).hostname);
}

type Env = Record<string, string | undefined>;

function https(host: string | undefined): URL | undefined {
  return host ? new URL(`https://${host}`) : undefined;
}

export function resolveSiteUrl(siteUrl: string, env: Env = process.env): URL {
  const configured = new URL(siteUrl);
  const placeholder = isPlaceholderSiteUrl(siteUrl);
  if (env.VERCEL_ENV === "production") {
    return placeholder ? (https(env.VERCEL_PROJECT_PRODUCTION_URL) ?? https(env.VERCEL_URL) ?? configured) : configured;
  }
  if (env.VERCEL_ENV) {
    return https(env.VERCEL_BRANCH_URL) ?? https(env.VERCEL_URL) ?? configured;
  }
  return placeholder ? new URL(`http://localhost:${env.PORT ?? 3000}`) : configured;
}
