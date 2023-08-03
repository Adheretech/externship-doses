/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  env: {
    DOSES_POST_ENDPOINT: process.env.DOSES_POST_ENDPOINT,
    DOSES_GET_ENDPOINT: process.env.DOSES_GET_ENDPOINT,
    DOSES_ENDPOINT_URL: process.env.DOSES_ENDPOINT_URL,
    DOSES_ENDPOINT_PORT: process.env.DOSES_ENDPOINT_PORT,
  },
};
