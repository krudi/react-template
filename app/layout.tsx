import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import Navigation from '~/components/Navigation'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

import '~/styles/styles.css'

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
    ],
}

export const metadata: Metadata = {
    title: 'krudi-io',
    metadataBase: new URL(process.env.NEXT_PUBLIC_PROJECT_URL as string),
    applicationName: 'krudi-io',
    description:
        'My current blog site built with React and Next.js, using latest Next.js features.',
    keywords: ['template'],
    referrer: 'origin-when-cross-origin',
    openGraph: {
        title: 'krudi-io',
        description:
            'My current blog site built with React and Next.js, using latest Next.js features.',
        url: process.env.NEXT_PUBLIC_PROJECT_URL as string,
        siteName: 'Next.js',
        images: [
            {
                url: process.env.NEXT_PUBLIC_PROJECT_URL as string + '/meta-tags/page-view.webp',
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
        description: 'My current blog site built with React and Next.js, using latest Next.js features.',
        card: 'summary_large_image',
        creator: '@twitter',
        creatorId: '1467726470533754880',
        siteId: '1467726470533754880',
        images: [
            {
                url: process.env.NEXT_PUBLIC_PROJECT_URL as string + '/meta-tags/page-view.webp',
                alt: 'Alternative description'
            }
        ]
    },
    icons: {
        icon: '/favicons/nextjs-favicon.svg',
        shortcut: '/favicons/nextjs-favicon.svg',
        apple: '/favicons/nextjs-apple-touch.svg'
    }
}

const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap'
})
export interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" dir="ltr" className={roboto.className}>
            <head />
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
    )
}
