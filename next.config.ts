import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cssChunking: "loose",
    reactCompiler: true,
    typedRoutes: true,
  },
};

export default withNextIntl(nextConfig) ;
