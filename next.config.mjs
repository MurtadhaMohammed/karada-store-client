/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drlab.us-east-1.linodeobjects.com",
        pathname: "/karada-store/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    crossOrigin: "anonymous",
  },
};

export default nextConfig;
