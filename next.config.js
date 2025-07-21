/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig