import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    deviceSizes: [320, 400, 460, 500, 640, 750, 828, 959, 1080, 1200, 1920],
  },
  output: 'standalone',
  productionBrowserSourceMaps: true,
};

export default nextConfig;
