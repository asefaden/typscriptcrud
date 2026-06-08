/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy task API requests to the backend
        source: '/api/tasks',
        //destination: 'http://localhost:5000/api/tasks',
        destination: 'https://typescript.app.aletcloud.com/api/tasks',
      },
      {
        source: '/api/tasks/:path*',
        destination: 'https://typescript.app.aletcloud.com/api/tasks/:path*',
      },
      {
        // 2. ለሎጊን እና ለምዝገባ APIዎች ማስተላለፊያ
        source: '/api/auth/:path*',
        destination: 'https://typescript.app.aletcloud.com/api/auth/:path*',
      },
      {
        // Proxy Prisma Studio requests
        source: '/prisma-admin',
        destination: 'https://typescript.app.aletcloud.com/prisma-admin',
      },
      {
        source: '/prisma/:path*',
        destination: 'https://typescript.app.aletcloud.com/prisma/:path*',
      }
    ];
  },
};

export default nextConfig;
