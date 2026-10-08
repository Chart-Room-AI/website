import type { DesignId } from "@config/schema";
import { clientConfig } from "@config/index";
import { classic } from "./classic";
import type { Design } from "./types";

/**
 * Design registry: maps config.design to a set of layouts.
 *
 * To add a design (see template/README.md):
 *   1. Create designs/<id>/ exporting a `Design` (Frame + the six pages),
 *      reading only from the config it is given.
 *   2. Add "<id>" to `designIds` in config/schema.ts.
 *   3. Register it below. TypeScript fails the build until steps 2 and 3 match.
 */
export const designs: Record<DesignId, Design> = {
  classic,
};

/** The design chosen by the active client config. */
export const activeDesign: Design = designs[clientConfig.design];
