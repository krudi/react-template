import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        authInterrupts: true,
    },
    reactStrictMode: true,
    poweredByHeader: false,
    transpilePackages: ['@krudi/consent'],
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
                            "font-src 'self'",
                            `connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com${process.env.NODE_ENV === 'development' ? ' ws:' : ''}`,
                            "media-src 'self'",
                            "object-src 'none'",
                            "frame-src 'none'",
                            "worker-src 'self' blob:",
                            "manifest-src 'self'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'none'",
                            ...((process.env['BETTER_AUTH_URL'] ?? '').startsWith('https://')
                                ? ['upgrade-insecure-requests']
                                : []),
                        ].join('; '),
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
