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
        "@realtyeaseai/database",
    ],
};

export default nextConfig;
