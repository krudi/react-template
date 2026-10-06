import type { NextConfig } from 'next';

import { contentSecurityPolicy } from './src/config/content-security-policy';

const nextConfig: NextConfig = {
    experimental: {
        authInterrupts: true,
    },
    reactStrictMode: true,
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: contentSecurityPolicy({
                            development: process.env.NODE_ENV === 'development',
                            https: (process.env['BETTER_AUTH_URL'] ?? '').startsWith('https://'),
                        }),
                    },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
