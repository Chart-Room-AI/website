import type { ComponentType, ReactNode } from "react";
import type { ClientConfig, DesignId } from "@config/schema";

export type DesignPageProps = { config: ClientConfig };

/** The page set every design must provide (routes live in src/app). */
export type DesignPages = {
  Home: ComponentType<DesignPageProps>;
  Services: ComponentType<DesignPageProps>;
  Gallery: ComponentType<DesignPageProps>;
  Reviews: ComponentType<DesignPageProps>;
  About: ComponentType<DesignPageProps>;
  Contact: ComponentType<DesignPageProps>;
};

export type Design = {
  id: DesignId;
  /** Human-readable name, for picking a design with a client. */
  label: string;
  /** Header, footer and any chrome wrapped around every page. */
  Frame: ComponentType<DesignPageProps & { children: ReactNode }>;
  pages: DesignPages;
};
