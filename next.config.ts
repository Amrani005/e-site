/** @type {import('next').NextConfig} */

module.exports = {
 
    serverActions: {
      bodySizeLimit: '30mb',
    },
  
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

