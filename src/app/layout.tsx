import '@app/globals.css';
import Footer from '@components/footer';
import Header from '@components/header';
import { ThemeProvider } from '@components/theme-provider';
import { serverEnv } from '@config/server-env';
import { siteUrl } from '@utils/site/site-url';
import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'React Template',
        template: '%s | React Template',
    },
    description: 'A Next.js template built on React with focus on performance, SEO, and best practices.',
    applicationName: 'React Template',
    authors: [{ name: 'Patryk Kudlik', url: siteUrl }],
    creator: 'React Template',
    publisher: 'React Template',
    referrer: 'strict-origin-when-cross-origin',
    alternates: {
        canonical: './',
    },
    openGraph: {
        url: './',
        siteName: 'React Template',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@twitter',
        creator: '@twitter',
    },
    verification: {
        google: serverEnv.GOOGLE_SITE_VERIFICATION,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark light',
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: 'white',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: 'black',
        },
    ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            dir="ltr"
            className={cn('font-sans', geist.variable)}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="container mx-auto px-4">
                        <Header />
                        <main aria-label="Main content">{children}</main>

                        <Footer />
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
