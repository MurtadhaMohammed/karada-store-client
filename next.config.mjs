/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karadastore.eu-central-1.linodeobjects.com",
        port: "",
        pathname: "/karada-store/**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "karadastore.iq",
        port: "",
        pathname: "/image/**",
      },
    ],
    minimumCacheTTL: 31536000,
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};
export default nextConfig;
