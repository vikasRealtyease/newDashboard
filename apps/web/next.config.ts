import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@realtyeaseai/ui',
    '@realtyeaseai/auth',
    '@realtyeaseai/types',
    '@realtyeaseai/utils',
    '@realtyeaseai/supabase',
  ],
  serverExternalPackages: ['@prisma/client', '@realtyeaseai/database'],
};

export default nextConfig;
