import type { ReactNode } from "react";
import type { DesignPageProps } from "../../types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SampleBanner } from "./SampleBanner";

export function Frame({ config, children }: DesignPageProps & { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-16 rounded bg-accent px-3 py-2 text-sm font-medium text-on-accent transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      {config.sample ? <SampleBanner /> : null}
      <Header config={config} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer config={config} />
    </>
  );
}
