/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
    images: {
      domains: ["drlab.us-east-1.linodeobjects.com"],
    },
  };
  
  export default nextConfig;
  
=======
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
  },
};

export default nextConfig;
>>>>>>> 35a80a88fa605a8f49299dca00273181124afad9
