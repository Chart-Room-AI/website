/**
 * Reviews nav tests: npm run test-nav
 * A client with no reviews gets no Reviews link in the header or footer and
 * /reviews 404s; a client with reviews (dry-creek-sample) keeps both.
 * Each config runs in its own process because CLIENT_CONFIG is read at import.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const cases = [
  { id: "fairwater", hasReviews: false },
  { id: "dry-creek-sample", hasReviews: true },
];

async function child(id: string, hasReviews: boolean) {
  const { clientConfig } = await import("../config/index");
  const { Header } = await import("../designs/classic/components/Header");
  const { Footer } = await import("../designs/classic/components/Footer");
  const { default: ReviewsPage } = await import("../src/app/reviews/page");
  assert.equal(clientConfig.id, id);
  assert.equal(clientConfig.reviews.length > 0, hasReviews, "fixture: review count");

  for (const [name, C] of [["header", Header], ["footer", Footer]] as const) {
    const html = renderToStaticMarkup(createElement(C, { config: clientConfig }));
    assert.equal(html.includes('href="/reviews"'), hasReviews, `${id}: ${name} Reviews link`);
    assert.ok(html.includes('href="/about"'), `${id}: ${name} still renders nav`);
  }

  let status = 200;
  try {
    ReviewsPage();
  } catch (error) {
    const digest = String((error as { digest?: string }).digest ?? "");
    if (!digest.includes("404")) throw error;
    status = 404;
  }
  assert.equal(status, hasReviews ? 200 : 404, `${id}: /reviews status`);
  console.log(`✓ ${id}: Reviews link in header/footer ${hasReviews ? "shown" : "hidden"}, /reviews ${status}`);
}

if (process.env.NAV_TEST_CHILD) {
  const c = cases.find((x) => x.id === process.env.CLIENT_CONFIG)!;
  child(c.id, c.hasReviews).catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  let failed = 0;
  for (const c of cases) {
    const r = spawnSync(process.execPath, [...process.execArgv, process.argv[1]], {
      env: { ...process.env, CLIENT_CONFIG: c.id, NAV_TEST_CHILD: "1" },
      stdio: "inherit",
    });
    if (r.status !== 0) failed += 1;
  }
  console.log(`${cases.length - failed}/${cases.length} passed`);
  process.exit(failed ? 1 : 0);
}
