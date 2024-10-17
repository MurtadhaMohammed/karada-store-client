/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["drlab.us-east-1.linodeobjects.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
