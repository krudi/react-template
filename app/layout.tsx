import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '@/styles/styles.scss'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PROJECT_URL as string),
  title: 'krudi-io',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  description:
    'My current blog site built with React and Next.js, using latest Next.js features.',
  keywords: ['template'],
  generator: 'Next.js',
  applicationName: 'krudi-io',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  creator: 'Creator',
  publisher: 'Publisher',
  category: 'Category',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
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
  authors: [
    {
      name: 'Author',
      url: process.env.NEXT_PUBLIC_PROJECT_URL as string
    }
  ],
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
        width: 1800,
        height: 1600,
        alt: 'Alternative description'
      }
    ]
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PROJECT_URL as string,
    languages: {
      'en-US': process.env.NEXT_PUBLIC_PROJECT_URL as string
    },
    media: {
      'only screen and (max-width: 600px)':
        process.env.NEXT_PUBLIC_PROJECT_URL as string + '/meta-tags/page-view.webp'
    }
  },
  manifest: '/manifest.webmanifest',
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
        <div className="container mx-auto">
          <Navigation />

          <Header />

          <main className="my-10 p-5 border-1 border-gray-300">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
