/** @type {import('next').NextConfig} */
module.exports = {
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
