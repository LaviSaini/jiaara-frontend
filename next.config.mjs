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
          "https://www.jiaarajewellery.com/api/cms/woocommerce/categories/getCategories", // External API
      },
      {
        source: '/collections/getCollections',
        destination: 'https://www.jiaarajewellery.com/api/cms/woocommerce/collections/getCollections'
      },
      {
        source: '/analytics/getProductsAnalytics',
        destination: 'https://www.jiaarajewellery.com/api/cms/woocommerce/analytics/getProductsAnalytics'
      },
      {
        source: '/products/getProducts',
        destination: 'https://www.jiaarajewellery.com/api/cms/woocommerce/products/getProducts'
      }
      ,
      {
        source: '/products/getProductsByIds',
        destination: 'https://www.jiaarajewellery.com/api/cms/woocommerce/products/getProductsByIds'
      }
      // ,
      // {
      //   source: '/payment/send-mail',
      //   destination: 'http://localhost:9122/api/v1/payment/send-mail'
      // }
    ];
  },

};

export default nextConfig;