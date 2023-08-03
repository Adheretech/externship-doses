/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  env: {
    DOSES_ENDPOINT_URL: process.env.DOSES_ENDPOINT_URL,
    DOSES_ENDPOINT_PORT: process.env.DOSES_ENDPOINT_PORT,
  },
};
