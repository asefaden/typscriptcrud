/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // 1. ተጠቃሚው ://aletcloud.com ሲል የባክኤንድ APIዎችን እንዲያገኝ ማድረጊያ
        source: '/app/tasks',
        destination: 'http://localhost:5000/api/tasks',
      },
      {
        source: '/app/tasks/:path*',
        destination: 'http://localhost:5000/api/tasks/:path*',
      },
      {
        // 2. ለሎጊን እና ለምዝገባ APIዎች ማስተላለፊያ
        source: '/api/auth/:path*',
        destination: 'http://localhost:5000/api/auth/:path*',
      },
      {
        // 3. ተጠቃሚው ://aletcloud.com ሲል ወደ ፕሪስማ ስቱዲዮ እንዲያልፍ ማድረጊያ
        source: '/prisma',
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
