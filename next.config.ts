import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "dm-workflows-lovat.vercel.app",
          },
        ],
        destination: "https://dmworkflows.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;