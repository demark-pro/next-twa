/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? '/next-twa' : ''
};

export default nextConfig;