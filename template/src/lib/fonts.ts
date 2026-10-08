import {
  DM_Sans,
  EB_Garamond,
  Fraunces,
  Inter,
  Libre_Baskerville,
  Lora,
  Manrope,
  Merriweather,
  Montserrat,
  Nunito,
  Open_Sans,
  Oswald,
  Playfair_Display,
  Raleway,
  Roboto,
  Roboto_Slab,
  Source_Sans_3,
  Work_Sans,
} from "next/font/google";
import type { FontId } from "@config/font-catalog";

/*
 * Every font in config/font-catalog.ts, loaded with next/font (self-hosted at
 * build time). next/font needs literal options at module scope, so each one is
 * declared here. preload is off because a site uses only one or two of these;
 * the browser never downloads the unused ones.
 */
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-inter" });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-source-sans-3" });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-open-sans" });
const roboto = Roboto({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-roboto" });
const nunito = Nunito({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-nunito" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-dm-sans" });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-work-sans" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-manrope" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-montserrat" });
const raleway = Raleway({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-raleway" });
const lora = Lora({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-lora" });
const merriweather = Merriweather({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-merriweather" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-libre-baskerville" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-roboto-slab" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-eb-garamond" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-fraunces" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-playfair-display" });
const oswald = Oswald({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-oswald" });

type LoadedFont = { variable: string; cssVar: string };
const load = (font: { variable: string }, cssVar: string): LoadedFont => ({ variable: font.variable, cssVar });

export const fonts: Record<FontId, LoadedFont> = {
  inter: load(inter, "--font-inter"),
  "source-sans-3": load(sourceSans3, "--font-source-sans-3"),
  "open-sans": load(openSans, "--font-open-sans"),
  roboto: load(roboto, "--font-roboto"),
  nunito: load(nunito, "--font-nunito"),
  "dm-sans": load(dmSans, "--font-dm-sans"),
  "work-sans": load(workSans, "--font-work-sans"),
  manrope: load(manrope, "--font-manrope"),
  montserrat: load(montserrat, "--font-montserrat"),
  raleway: load(raleway, "--font-raleway"),
  lora: load(lora, "--font-lora"),
  merriweather: load(merriweather, "--font-merriweather"),
  "libre-baskerville": load(libreBaskerville, "--font-libre-baskerville"),
  "roboto-slab": load(robotoSlab, "--font-roboto-slab"),
  "eb-garamond": load(ebGaramond, "--font-eb-garamond"),
  fraunces: load(fraunces, "--font-fraunces"),
  "playfair-display": load(playfairDisplay, "--font-playfair-display"),
  oswald: load(oswald, "--font-oswald"),
};
