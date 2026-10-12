import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The vanilla kit moved into the Engine kits area.
    return [{ source: "/docs/kit", destination: "/kits/html", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      {
        // The kit is loaded from other sites (ES modules and fonts need CORS).
        source: "/kit/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
