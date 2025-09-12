import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ]
  },
  images: {
    domains: [
      'images.unsplash.com',
      'images.contentstack.io',
      'downloadserver-cdn.nelogica.com.br',
    ],
  },
}

export default nextConfig
