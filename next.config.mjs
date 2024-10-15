/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drlab.us-east-1.linodeobjects.com",
        port: "",
        pathname: "/karada-store/**",
      },
    ],
  },
};

export default nextConfig;
