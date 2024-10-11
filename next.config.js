/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  images: {
    domains: ['example.com']
  },
  webpack: (config, { isServer }) => {
    return config;
  }
};

module.exports = nextConfig;
