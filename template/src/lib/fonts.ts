import { Fraunces, Inter, Lora, Montserrat, Source_Sans_3 } from "next/font/google";
import type { FontId } from "@config/schema";

/*
 * Fonts a client config can choose (brand.fonts.heading / brand.fonts.body).
 * next/font needs literal options at module scope, so every option is declared
 * here. preload is off because only one or two of these are used per site; the
 * unused ones are never downloaded by the browser.
 * To offer a new font: add it here and to fontIds in config/schema.ts.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-3", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });

type LoadedFont = { variable: string; cssVar: string };

export const fonts: Record<FontId, LoadedFont> = {
  inter: { variable: inter.variable, cssVar: "--font-inter" },
  "source-sans-3": { variable: sourceSans3.variable, cssVar: "--font-source-sans-3" },
  montserrat: { variable: montserrat.variable, cssVar: "--font-montserrat" },
  lora: { variable: lora.variable, cssVar: "--font-lora" },
  fraunces: { variable: fraunces.variable, cssVar: "--font-fraunces" },
};
