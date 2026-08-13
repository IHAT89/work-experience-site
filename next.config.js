/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  // Standalone output is only needed for self-hosted Docker (see Dockerfile,
  // which copies .next/standalone and runs server.js). On Vercel, standalone
  // output breaks the build on Next 16.3.0 with an ENOENT for
  // .next/next-server.js.nft.json during onBuildComplete, and Vercel handles
  // output file tracing natively, so it must not be set there.
  output: process.env.VERCEL ? undefined : "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "workexperience.com.sg" }],
        destination: "https://workexperience.sg/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.workexperience.com.sg" }],
        destination: "https://workexperience.sg/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
