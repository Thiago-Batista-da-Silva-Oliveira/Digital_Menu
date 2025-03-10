/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // Add known domains for restaurant logos and food images
      'images.unsplash.com', 
      'via.placeholder.com',
      // Add your production image domains
      'your-production-domain.com',
      // For local development
      'localhost'
    ],
  },
  // Enable experimental app router features
  experimental: {
    // For Next.js 15, adjust experimental options as needed
  },
};

module.exports = nextConfig;