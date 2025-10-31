/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    experimental: {
        globalNotFound: true,
        authInterrupts: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
