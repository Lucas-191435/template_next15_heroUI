/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.mos.cms.futurecdn.net",
      "images.unsplash.com",
      "your-cdn.com"
    ],
  },
  env: { NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL }
};

module.exports = nextConfig;
