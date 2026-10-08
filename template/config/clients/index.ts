import type { ClientConfigInput } from "../schema";
import { dryCreekSample } from "./dry-creek-sample";

/**
 * Every client config the template can build. The key is the CLIENT_CONFIG
 * value and must match the config's `id`. To add a client, create
 * config/clients/<id>.ts and register it here.
 */
export const clientConfigs: Record<string, ClientConfigInput> = {
  "dry-creek-sample": dryCreekSample,
};
