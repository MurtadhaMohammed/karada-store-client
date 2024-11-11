/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karadastore.eu-central-1.linodeobjects.com",
        port: "", // Leave empty for default port
        pathname: "/**", // Allow all paths within this domain
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;
