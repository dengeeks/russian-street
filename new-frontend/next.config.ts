import type { NextConfig } from 'next';
import {remoteMediaPattern } from "@/shared/settings"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      remoteMediaPattern ,
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },

    ],
    deviceSizes: [320, 400, 460, 500, 640, 750, 828, 959, 1080, 1200, 1920],
  },
  output: 'standalone',
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig