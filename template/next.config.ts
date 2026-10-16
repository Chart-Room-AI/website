import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Build-time choice of client config (config/clients/<id>.ts).
    // Empty means the default in config/index.ts.
    CLIENT_CONFIG: process.env.CLIENT_CONFIG ?? "",
  },
};

export default nextConfig;
