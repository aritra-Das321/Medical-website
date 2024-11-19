/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable built-in image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doctor-app-bp0m.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
