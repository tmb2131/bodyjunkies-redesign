import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude public assets from serverless bundle (served by CDN).
  // getHomeMedia() reads public/assets at build time; tracing can pull 250MB+ into the function.
  outputFileTracingExcludes: {
    "/*": ["public/**"],
  },
};

export default nextConfig;
