import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        globalNotFound: true,
        authInterrupts: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
