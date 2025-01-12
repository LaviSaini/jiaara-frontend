/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.jiaarajewellery.com',
        port: '',
        pathname: '**'
      }
    ]
  },

  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/getCategories", // Local API endpoint
        destination:
          "https://www.jiaarajewellery.com/api/cms/woocommerce/categories/getCategories?page=1&per_page=100&parent=0&keys[]=page&keys[]=per_page&keys[]=parent", // External API
      },
    ];
  },

};

export default nextConfig;