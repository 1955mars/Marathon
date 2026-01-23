import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Marathon",
  assetPrefix: "/Marathon",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
