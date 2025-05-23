/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['crazy-cattle3d.org'],
  },
  // 定义环境变量，确保在浏览器端可用
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://crazy-cattle3d.org',
  },
}

export default nextConfig
