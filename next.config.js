// disable ts rules for JS file - not a problem during build but most IDE formatters will complain.
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')([
  '@awsui/components-react',
  '@awsui/global-styles',
  '@awsui/collection-hooks',
  '@awsui/design-tokens',
]);
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true,
  },
};

// withTM has a documented requirement to be last
module.exports = withPlugins([withBundleAnalyzer, withTM], nextConfig);
