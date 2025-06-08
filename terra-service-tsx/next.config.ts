import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  async rewrites() {
    return [
      {
        source: '/koios/:path*',
        destination: 'https://preview.koios.rest/api/v1/:path*',
      },
    ];
  },

  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },
};

export default nextConfig;
