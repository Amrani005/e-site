import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'txydigitalproducts.dreamhosters.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
