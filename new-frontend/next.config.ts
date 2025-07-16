import type { NextConfig } from 'next'
import { remoteMediaPattern } from '@/shared/settings'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      remoteMediaPattern,
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      },
      {
        protocol: 'https',
        hostname: 'rutube.ru'
      }
    ],
    deviceSizes: [320, 400, 460, 500, 640, 750, 828, 959, 1080, 1200, 1920]
  },
  output: 'standalone',
  logging: {
    fetches: {
      hmrRefreshes: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    cssChunking: false
  },

  async headers() {
    return [
      {
        source: '/:path*.(jpg|jpeg|png|gif|webp|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*.(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=3600'
          }
        ]
      },

    ]
  },

}

export default nextConfig
