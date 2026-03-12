import { MetadataRoute } from 'next';

import { siteUrl } from '@utils/site-url';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/error', '/not-found'],
        },
        host: siteUrl,
        sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    };
}
