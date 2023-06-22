import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/error',
        '/not-found',
      ]
    },
    host: process.env.NEXT_PUBLIC_PROJECT_URL as string,
    sitemap: process.env.NEXT_PUBLIC_PROJECT_URL as string + '/sitemap.xml',
  }
}
