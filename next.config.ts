import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  // {
  //   source: "/api/auth/:path*",
  //   destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/:path*`,
  // },
  //   ];
  // },
};

export default nextConfig;
