import type { Metadata } from 'next';

import { siteUrl } from '@utils/site-url';

export const siteMetadata = {
    siteUrl,
    name: 'React Template',
    title: 'React Template',
    description: 'A Next.js template built on React with focus on performance, SEO, and best practices.',
    keywords: ['react template', 'next.js template', 'performance', 'seo', 'best practices'] as string[],
    locale: 'en_US',
    ogImage: {
        url: new URL('/meta-tags/page-view.png', siteUrl).toString(),
        alt: 'Page preview',
        width: 1800,
        height: 1600,
    },
    authors: [
        {
            name: 'Patryk Kudlik',
            url: siteUrl,
        },
    ] satisfies NonNullable<Metadata['authors']>,
    verification: {
        google: 'Q9rK2mA0ZxWcE4B_HY8nLJpUoFqGdS7V5tI1eM6l3',
    } satisfies NonNullable<Metadata['verification']>,
} as const;

type CreatePageMetadataOptions = {
    path?: string;
    title?: string;
    description?: string;
    keywords?: string[];
};

export function createPageMetadata({
    path = '/',
    title = siteMetadata.title,
    description = siteMetadata.description,
    keywords = siteMetadata.keywords,
}: CreatePageMetadataOptions): Metadata {
    const canonicalUrl = new URL(path, siteMetadata.siteUrl).toString();

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: siteMetadata.name,
            locale: siteMetadata.locale,
            type: 'website',
            images: [
                {
                    url: siteMetadata.ogImage.url,
                    width: siteMetadata.ogImage.width,
                    height: siteMetadata.ogImage.height,
                    alt: siteMetadata.ogImage.alt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [siteMetadata.ogImage.url],
        },
    };
}
