/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@realtyeaseai/ui",
    "@realtyeaseai/auth",
    "@realtyeaseai/types",
    "@realtyeaseai/utils",
    "@realtyeaseai/supabase",
  ],
};

export default nextConfig;
