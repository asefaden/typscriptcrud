/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy task API requests to the backend
        source: '/api/tasks',
        destination: 'http://localhost:5000/api/tasks',
      },
      {
        source: '/api/tasks/:path*',
        destination: 'http://localhost:5000/api/tasks/:path*',
      },
      {
        // 2. ለሎጊን እና ለምዝገባ APIዎች ማስተላለፊያ
        source: '/api/auth/:path*',
        destination: 'http://localhost:5000/api/auth/:path*',
      },
      {
        // Proxy Prisma Studio requests
        source: '/prisma-admin',
        destination: 'http://localhost:5555',
      },
      {
        source: '/prisma/:path*',
        destination: 'http://localhost:5555/:path*',
      }
    ];
  },
};

export default nextConfig;
