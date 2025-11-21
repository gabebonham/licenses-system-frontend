import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: '50mb' } },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
  images: {
    domains: [
      'images.unsplash.com',
      'images.contentstack.io',
      'downloadserver-cdn.nelogica.com.br',
      'localhost',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5005',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
