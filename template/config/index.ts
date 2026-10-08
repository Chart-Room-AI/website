import { z } from "zod";
import { clientConfigs, DEFAULT_CLIENT_CONFIG } from "./clients";
import { clientConfigSchema, type ClientConfig } from "./schema";

/**
 * Loads and validates the active client config. CLIENT_CONFIG is inlined at
 * build time (see next.config.ts), so a bad id or an invalid config fails
 * `next build` instead of shipping a broken site.
 */
function loadClientConfig(): ClientConfig {
  const id = process.env.CLIENT_CONFIG?.trim() || DEFAULT_CLIENT_CONFIG;
  const input = clientConfigs[id];
  if (!input) {
    throw new Error(
      `CLIENT_CONFIG="${id}" is not registered in config/clients/index.ts. ` +
        `Known configs: ${Object.keys(clientConfigs).join(", ")}`,
    );
  }

  const result = clientConfigSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Client config "${id}" is invalid:\n${z.prettifyError(result.error)}`);
  }
  if (result.data.id !== id) {
    throw new Error(`Client config registered as "${id}" has id "${result.data.id}"; they must match.`);
  }
  return result.data;
}

export const clientConfig = loadClientConfig();
export { DEFAULT_CLIENT_CONFIG };
export type { ClientConfig } from "./schema";
