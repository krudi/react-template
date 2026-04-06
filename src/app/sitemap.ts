import { siteUrl } from '@utils/site-url';
import { MetadataRoute } from 'next';

const publicRoutes = ['/'];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return publicRoutes.map((route) => ({
        url: new URL(route, siteUrl).toString(),
        lastModified,
    }));
}
