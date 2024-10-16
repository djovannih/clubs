import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cssChunking: "loose",
    reactCompiler: true,
    typedRoutes: true,
    useLightningcss: true,
  },
};

export default nextConfig;
