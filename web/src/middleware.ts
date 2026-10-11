import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CARE_HELM_HOST = "carehelm.chartroomai.com";
const MAIN_SITE_URL = "https://www.chartroomai.com";

function isCareHelmHost(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  return host === CARE_HELM_HOST;
}

function isPassthroughPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/documents") ||
    /\.(?:ico|png|jpg|jpeg|svg|webp|pdf)$/.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  if (!isCareHelmHost(request)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isPassthroughPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "") {
    return NextResponse.rewrite(new URL("/care-helm", request.url));
  }

  if (pathname === "/care-helm") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/care-helm/")) {
    const remainder = pathname.slice("/care-helm".length) || "/";
    return NextResponse.redirect(new URL(remainder, request.url));
  }

  return NextResponse.redirect(new URL(`${MAIN_SITE_URL}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
