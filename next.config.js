/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output as we're using a simpler setup
  output: 'export',
  // Ensure the server can be accessed from outside the container
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 