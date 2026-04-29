/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  output: "standalone",
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
