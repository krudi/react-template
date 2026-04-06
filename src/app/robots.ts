import { siteUrl } from '@utils/site-url';
import { MetadataRoute } from 'next';

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
