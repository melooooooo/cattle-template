/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['thetoothfae.com'],
  },
  // 定义环境变量，确保在浏览器端可用
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://thetoothfae.com',
  },
  // 添加重定向配置
  async redirects() {
    return [
      {
        source: '/reviews',
        destination: '/comments',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 