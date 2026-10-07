import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'react-template',
        short_name: 'react-template',
        description: 'Description for the webmanifest file.',
        theme_color: '#FFFFFF',
        background_color: '#2596BE',
        display_override: ['window-controls-overlay'],
        display: 'standalone',
        id: '/',
        start_url: '/',
        scope: '/',
        lang: 'en-EN',
        orientation: 'any',
        prefer_related_applications: false,
        categories: ['template'],
        icons: [
            {
                src: '/icon-192x192.png',
                type: 'image/png',
                sizes: '192x192',
                purpose: 'any',
            },
            {
                src: '/icon-512x512.png',
                type: 'image/png',
                sizes: '512x512',
                purpose: 'any',
            },
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
            },
        ],
    };
}
