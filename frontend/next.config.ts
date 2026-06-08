/** @type {import('next').NextConfig} */

const BACKEND_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : 'https://typescript.app.aletcloud.com';

const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy task API requests to the backend
        source: '/api/tasks',
        destination: `${BACKEND_URL}/api/tasks`,
      },
      {
        source: '/api/tasks/:path*',
        destination: `${BACKEND_URL}/api/tasks/:path*`,
      },
      {
        // Proxy for login and registration APIs
        source: '/api/auth/:path*',
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
      {
        // Proxy Prisma Studio requests
        source: '/prisma-admin',
        destination: `${BACKEND_URL}/prisma-admin`,
      },
      {
        source: '/prisma/:path*',
        destination: `${BACKEND_URL}/prisma/:path*`,
      }
    ];
  },
};

export default nextConfig;
