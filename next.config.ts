import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.corinthians.com.br",
      },
    ],
  },
};

export default nextConfig;
