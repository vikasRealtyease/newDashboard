/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@realtyeaseai/ui",
    "@realtyeaseai/auth",
    "@realtyeaseai/database",
    "@realtyeaseai/types",
    "@realtyeaseai/utils",
    "@realtyeaseai/supabase",
  ],
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;
