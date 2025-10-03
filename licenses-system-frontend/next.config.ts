import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
  },
}

export default nextConfig
