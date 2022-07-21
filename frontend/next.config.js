/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack: config => {
    return config;
  },
};

module.exports = withPlugins([[withOptimizedImages]], nextConfig);
