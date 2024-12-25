import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const domain = headersList.get('host') as string;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/error', '/not-found']
        },
        host: `https://${domain}`,
        sitemap: `https://${domain}/sitemap.xml`
    };
}
