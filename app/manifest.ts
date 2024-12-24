import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'react-template',
        short_name: 'react-template',
        description: 'Description for the webmanifest file.',
        theme_color: '#000000',
        background_color: '#2596BE',
        display_override: [
            "window-controls-overlay"
        ],
        display: 'standalone',
        id: '/',
        start_url: '/',
        lang: 'en-EN',
        orientation: 'any',
        prefer_related_applications: true,
        categories: ['template'],
        icons: [
            {
                src: 'favicons/nextjs-16x16.svg',
                type: 'image/svg+xml',
                sizes: '16x16',
                purpose: 'maskable'
            },
            {
                src: 'favicons/nextjs-32x32.svg',
                type: 'image/svg+xml',
                sizes: '32x32',
                purpose: 'maskable'
            },
            {
                src: 'favicons/nextjs-48x48.svg',
                type: 'image/svg+xml',
                sizes: '48x48',
                purpose: 'maskable'
            },
            {
                src: 'favicons/nextjs-144x144.svg',
                type: 'image/svg+xml',
                sizes: '144x144',
                purpose: 'any'
            },
            {
                src: 'favicons/nextjs-192x192.svg',
                type: 'image/svg+xml',
                sizes: '192x192',
                purpose: 'maskable'
            },
            {
                src: 'favicons/nextjs-512x512.svg',
                type: 'image/svg+xml',
                sizes: '512x512',
                purpose: 'maskable'
            }
        ],
        screenshots: [
            {
                src: 'manifest/desktop-home-screen-view.webp',
                sizes: '1280x720',
                type: 'image/webp',
                label: 'Homescreen of the app in the desktop view.',
                form_factor: 'wide',
            },
            {
                src: 'manifest/mobile-home-screen-view.webp',
                sizes: '540x720',
                type: 'image/webp',
                label: 'Homescreen of the app in the mobile view.',
                form_factor: 'narrow',
            }
        ]
    };
}
