import '~/styles/styles.css';

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { headers } from 'next/headers';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';
import { RootLayoutProps } from '~/types';

export const icons = {
    icon: [
        {
            url: '/favicons/favicon-16x16.png',
            type: 'image/png',
            sizes: '16x16'
        },
        {
            url: '/favicons/favicon-32x32.png',
            type: 'image/png',
            sizes: '32x32'
        },
        {
            url: '/favicons/favicon-36x36.png',
            type: 'image/png',
            sizes: '36x36'
        },
        {
            url: '/favicons/favicon-48x48.png',
            type: 'image/png',
            sizes: '48x48'
        },
        {
            url: '/favicons/favicon-72x72.png',
            type: 'image/png',
            sizes: '72x72'
        },
        {
            url: '/favicons/favicon-96x96.png',
            type: 'image/png',
            sizes: '96x96'
        },
        {
            url: '/favicons/favicon-144x144.png',
            type: 'image/png',
            sizes: '144x144'
        },
        {
            url: '/favicons/android-icon-192x192.png',
            type: 'image/png',
            sizes: '192x192'
        },
        {
            url: '/favicons/favicon-512x512.png',
            type: 'image/png',
            sizes: '512x512'
        }
    ],
    shortcut: [
        {
            url: '/favicons/favicon.ico',
            type: 'image/x-icon'
        }
    ],
    apple: [
        {
            url: '/favicons/apple-icon-57x57.png',
            sizes: '57x57'
        },
        {
            url: '/favicons/apple-icon-60x60.png',
            sizes: '60x60'
        },
        {
            url: '/favicons/apple-icon-72x72.png',
            sizes: '72x72'
        },
        {
            url: '/favicons/apple-icon-76x76.png',
            sizes: '76x76'
        },
        {
            url: '/favicons/apple-icon-114x114.png',
            sizes: '114x114'
        },
        {
            url: '/favicons/apple-icon-120x120.png',
            sizes: '120x120'
        },
        {
            url: '/favicons/apple-icon-144x144.png',
            sizes: '144x144'
        },
        {
            url: '/favicons/apple-icon-152x152.png',
            sizes: '152x152'
        },
        {
            url: '/favicons/apple-icon-180x180.png',
            sizes: '180x180'
        }
    ],
    other: [
        {
            rel: 'manifest',
            url: '/manifest.json'
        }
    ]
};

export const generateMetadata = async (): Promise<Metadata> => {
    const headersList = await headers();
    const domain = headersList.get('host') as string;

    return {
        title: 'krudi-io',
        metadataBase: new URL(`https://${domain}`),
        applicationName: 'krudi-io',
        description:
            'My current blog site built with React and Next.js, using latest Next.js features.',
        keywords: ['template'],
        referrer: 'origin-when-cross-origin',
        openGraph: {
            title: 'krudi-io',
            description:
                'My current blog site built with React and Next.js, using latest Next.js features.',
            url: `https://${domain}`,
            siteName: 'Next.js',
            images: [
                {
                    url: `https://${domain}/meta-tags/page-view.webp`,
                    width: 1800,
                    height: 1600,
                    alt: 'Alternative description'
                }
            ],
            locale: 'en-US',
            type: 'website'
        },
        twitter: {
            title: 'krudi-io',
            description:
                'My current blog site built with React and Next.js, using latest Next.js features.',
            card: 'summary_large_image',
            creator: '@twitter',
            creatorId: '1467726470533754880',
            siteId: '1467726470533754880',
            images: [
                {
                    url: `https://${domain}/meta-tags/page-view.webp`,
                    alt: 'Alternative description'
                }
            ]
        },
        icons,
    };
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    colorScheme: 'dark light',
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: 'white'
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: 'black'
        }
    ]
};

const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap'
});

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" dir="ltr" className={roboto.className}>
            <head>
                <meta
                    name="msapplication-config"
                    content="/browserconfig.xml"
                />
                <meta
                    name="msapplication-TileImage"
                    content="/favicons/ms-icon-144x144.png"
                />
                <meta
                    name="msapplication-TileColor"
                    content="#ffffff"
                />
                <meta
                    name="theme-color"
                    content="#ffffff"
                />
            </head>
            <body>
                <div className="container">
                    <Navigation />

                    <Header />

                    <main className="main">
                        {children}
                    </main>

                    <Footer />
                </div>
            </body>
        </html>
    );
}
