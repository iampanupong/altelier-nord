import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Sample catalog imagery (see src/lib/unsplash.ts)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: "?auto=format&fit=crop&w=2000&q=80",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search:
          "?auto=format&fit=crop&w=1600&h=2000&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=2",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
