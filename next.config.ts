import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "me0zd8dmc7.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
